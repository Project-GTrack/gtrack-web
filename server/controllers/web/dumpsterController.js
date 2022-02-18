const { Sequelize } = require("sequelize");
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
            try{
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
            }catch(e){
                console.log(e);
            }
        
        })
        res.send({success:true,message:"Dumpster Successfully Added"});
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
    console.log(req.body.accessToken);
    if(req.body.accessToken!= undefined){
        jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
            let dumps = await dumpster.model.update({
                admin_id:JSON.parse(decoded.user_id).user_id,
                street:req.body.street,
                purok:req.body.purok,
                barangay:req.body.barangay,
                town:req.body.town,
                postal_code:req.body.postal_code,
                latitude:req.body.latitude,
                longitude:req.body.longitude,
            },{where:{
                dumpster_id:req.params.id
            }})
        })
        res.send({success:true,message:"Dumpster Successfully Updated"});
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
                res.send({success:true,message:"Dumpster Successfully Deleted"});
            }else{
                res.send({success:false,message:"Password did not match"});
            }
        })
        
    }
}