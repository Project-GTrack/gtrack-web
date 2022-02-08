const { Sequelize } = require("sequelize");
require('dotenv').config("../../.env");
const user=require("../../models/user");
var moment = require('moment');

exports.updateGeneralInfo=async (req,res)=>{
    let account=await user.model.findOne({ where: { email: req.body.email } });
    if(account){
        let acc=await user.model.update({fname:req.body.fname,lname:req.body.lname,contact_no:req.body.contact_no,gender:req.body.gender,birthday:req.body.birthday},{
            where:{
                email:req.body.email
            }
        });
        if(acc){
            acc=await user.model.findOne({ where: { email: req.body.email } });
            res.send({success:true,message:"Profile updated successfully.",data:acc});
        }else{
            res.send({success:false,message:"Error updating profile",data:null});
        }
    }else{
        res.send({success:false,data:null});
    }
}

exports.address=async (req,res)=>{
    let account=await user.model.findOne({ where: { email: req.body.email } });
    if(account){
        let acc=await user.model.update({purok:req.body.purok,street:req.body.street,barangay:req.body.barangay,town:"Compostela",postal_code:"6003"},{
            where:{
                email:req.body.email
            }
        });
        if(acc){
            acc=await user.model.findOne({ where: { email: req.body.email } });
            res.send({success:true,message:"Address updated successfully.",data:acc});
        }else{
            res.send({success:false,message:"Error updating address",data:null});
        }
    }else{
        res.send({success:false,data:null});
    }
}

exports.change_password=async (req,res)=>{
    let account=await user.model.findOne({ where: { email: req.body.email } });
    if(account){
        let acc=await user.model.update({password:req.body.password},{
            where:{
                email:req.body.email
            }
        });
        if(acc){
            acc=await user.model.findOne({ where: { email: req.body.email } });
            res.send({success:true,message:"Password changed successfully.",data:acc});
        }else{
            res.send({success:false,message:"Error updating password",data:null});
        }
    }else{
        res.send({success:false,data:null});
    }
}