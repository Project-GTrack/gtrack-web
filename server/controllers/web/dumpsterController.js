const { Sequelize, Op } = require("sequelize");
require('dotenv').config("../../.env");
const dumpster = require("../../models/dumpster");
const user = require("../../models/user");
const jwt=require("jsonwebtoken");
var C = require("crypto-js");
const { sequelize } = require('../../connection');

exports.getDumpsters = async (req,res) => {
    let dumps = await dumpster.model.findAll();
    res.send({success:true,data:dumps});
}
exports.addDumpster = async (req,res) => {
    if(req.body.accessToken!= undefined){
        jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
            let dumps = await dumpster.model.create({
                admin_id:JSON.parse(decoded.user_id).user_id,
                street:req.body.street,
                purok:req.body.purok,
                barangay:req.body.barangay,
                town:req.body.town,
                postal_code:req.body.postal_code,
                latitude:req.body.latitude,
                longitude:req.body.longitude,
                complete:0,
            })    
            if(dumps){
                dumps = await dumpster.model.findAll();
                res.send({success:true,message:"New dumpster is added",data:dumps});
            }else{
                res.send({success:false,message:"No dumpster added",data:null});
            }
            
        })
    }else{
        res.send({success:false,message:"Failed, Dumpster was not added"});
    }
}
exports.getDumpster = async (req,res) => {
    let dumps = await dumpster.model.findOne({
        where:{
            dumpster_id:req.params.id,
        }
    });
    res.send({success:true,data:dumps});
}
exports.editDumpster = async (req,res) => {
    if(req.body.accessToken!= undefined){
        jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
            let dumps = await dumpster.model.update({
                street:req.body.street,
                purok:req.body.purok,
                barangay:req.body.barangay,
                town:req.body.town,
                postal_code:req.body.postal_code,
                latitude:req.body.latitude,
                longitude:req.body.longitude,
            },{where:{
                dumpster_id:req.params.id,
                [Op.or]:[{
                    street: {
                        [Op.ne]: req.body.street
                    },
                },{
                    purok: {
                        [Op.ne]: req.body.purok
                    } 
                },{
                    barangay:{
                        [Op.ne]: req.body.barangay
                    }
                },{
                    town:{
                        [Op.ne]: req.body.town
                    }
                },{
                    postal_code:{
                        [Op.ne]:req.body.postal_code
                    }
                },{
                    latitude:{
                        [Op.ne]:req.body.latitude
                    }
                },{
                    longitude:{
                        [Op.ne]:req.body.longitude
                    }
                }]
            }})
            console.log(dumps);
            if(dumps != 0){
                dumps = await dumpster.model.findAll();
                res.send({success:true,message:"Dumpster has been updated",data:dumps});
            }else{
                res.send({success:false,message:"Dumpster already exist",data:null});
            }
            
        })
        
    }else{
        res.send({success:false,message:"Failed, Dumpster was not Updated"});
    }
}

exports.deleteDumpster = async (req,res) => {
    if(req.body.accessToken!= undefined){
        jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
            var bytes  = C.AES.decrypt(JSON.parse(decoded.user_id).password, process.env.SECRET_KEY);
            var originalText = bytes.toString(C.enc.Utf8);
            if(originalText === req.body.password){
                let dumps = await dumpster.model.destroy({
                    where:{
                        dumpster_id:req.params.id
                    }
                })
                if(dumps != 0){
                    dumps = await dumpster.model.findAll();
                    res.send({success:true,message:"Dumpster has been deleted",data:dumps});
                }else{
                    res.send({success:false,message:"Cannot delete dumpster",data:null});
                }
                
            }else{
                res.send({success:false,message:"Password did not match"});
            }
        })
        
    }
}