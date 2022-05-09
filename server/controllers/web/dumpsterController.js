const { Sequelize, Op } = require("sequelize");
require('dotenv').config("../../.env");
const dumpster = require("../../models/dumpster");
const user = require("../../models/user");
const jwt=require("jsonwebtoken");
var C = require("crypto-js");
const Firebase = require('../../helpers/firebase');
const { sequelize } = require('../../connection');


const database=Firebase.database();
exports.getDumpsters = async (req,res) => {
    let dumps = await dumpster.model.findAll({
        order: [['createdAt','DESC']]
    });
    res.send({success:true,data:dumps});
}
exports.addDumpster = async (req,res) => {
    if(req.body.accessToken!= undefined){
        jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
            let dumps = await dumpster.model.create({
                admin_id:JSON.parse(decoded.user_id).user_id,
                landmark:req.body.landmark,
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
                dumps = await dumpster.model.findOne({
                    limit: 1,
                    order: [ ['createdAt', 'DESC'] ]
                });
                database.ref("Dumpsters/" + dumps.dumpster_id).set({
                    dumpster_id: dumps.dumpster_id,
                    landmark:dumps.landmark,
                    street: dumps.street,
                    purok: dumps.purok,
                    barangay: dumps.barangay,
                    town: dumps.town,
                    postal_code: dumps.postal_code,
                    latitude: dumps.latitude,
                    longitude: dumps.longitude,
                    complete: dumps.complete,
                  });
                res.send({success:true,message:"Dumpster Location successfully Created!"});
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
                landmark:req.body.landmark,
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
                    landmark: {
                        [Op.ne]: req.body.landmark
                    }
                },{
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
            if(dumps != 0){
                database.ref("Dumpsters/" + req.params.id).update({
                    landmark:req.body.landmark,
                    street:req.body.street,
                    purok:req.body.purok,
                    barangay:req.body.barangay,
                    latitude:req.body.latitude,
                    longitude:req.body.longitude,
                    town:req.body.town,
                    postal_code:req.body.postal_code,
                  });
                res.send({success:true,message:"Dumpster Location successfully Updated"});
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
                    database.ref("Dumpsters/" + req.params.id).remove();
                    res.send({success:true,message:"Dumpster Location successfully Deleted"});
                }else{
                    res.send({success:false,message:"Cannot delete dumpster",data:null});
                }
                
            }else{
                res.send({success:false,message:"Password did not match"});
            }
        })
        
    }
}


exports.deleteDumpsterNew = async (req,res) => {
    if(req.body.accessToken){
        let dumps = await dumpster.model.destroy({
            where:{
                dumpster_id:req.params.id
            }
        })
        if(dumps){
            database.ref("Dumpsters/" + req.params.id).remove();
            res.send({success:true,message:"Dumpster Location successfully Deleted"});
        }else{
            res.send({success:false,message:"Cannot delete dumpster",data:null});
        }
        
    }
}
  