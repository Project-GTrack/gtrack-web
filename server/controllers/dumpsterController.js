const { Sequelize } = require("sequelize");
require('dotenv').config("../../.env");
const dumpster = require("../models/dumpster");
const user = require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { sequelize } = require('../connection');

exports.getDumpsters = async (req,res) => {
    let dumps = await dumpster.model.findAll();
    res.send({success:true,data:dumps});
}
exports.addDumpster = async (req,res) => {
    if(req.body.accessToken!= undefined){
        jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
            let dumps = await dumpster.model.create({
                admin_id:decoded.user_id,
                street:req.body.street,
                purok:req.body.purok,
                barangay:req.body.barangay,
                town:req.body.town,
                postal_code:req.body.postal_code,
                latitude:req.body.latitude,
                longitude:req.body.longitude,
                complete:0,
            })
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
                admin_id:decoded.user_id,
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
            let data = await user.model.findOne({
                where:{
                    user_id:decoded.user_id,
                }
            })
            if(bcrypt.compareSync(req.body.password, data.password)){
                let dumps = await dumpster.model.destroy({
                    where:{
                        dumpster_id:req.params.id
                    }
                })
                res.send({success:true,message:"Dumpster Successfully Deleted"});
            }else{
                res.send({success:false,message:"Password is Invalid"});
            }
        })
        
    }
}