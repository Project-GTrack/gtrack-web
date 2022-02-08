const { Sequelize } = require("sequelize");
require('dotenv').config("../../.env");
const user=require("../../models/user");
const schedule=require("../../models/schedule");
var C = require("crypto-js");
var moment = require('moment');
exports.register=async (req,res)=>{
    let account=await user.model.findOne({ where: { email: req.body.email } });
    if(account===null){
        let acc=null;
        if(!req.body.google_auth){
            acc=await user.model.create({email:req.body.email,password:req.body.password,fname:req.body.fname,lname:req.body.lname,user_type:"Resident"});
        }else{
            acc=await user.model.create({email:req.body.email,password:req.body.fname+req.body.lname,fname:req.body.fname,lname:req.body.lname,image:req.body.image,google_auth:true,user_type:"Resident"});
        }
        res.send({success:true,data:acc});
    }else{
        res.send({success:false,data:null});
    }
}

exports.login=async (req,res)=>{
    let account=await user.model.findOne({ where: { email: req.body.email }});
    let sched=await schedule.model.findOne({
        where:{
            driver_id:account.user_id,
        }
    })
    console.log("YEAHHBOI", account);
    if(account && !req.body.google_auth){
        if(!account.google_auth){
            var decrypted = C.AES.decrypt(account.password,process.env.SECRET_KEY);
            console.log(req.body.password,decrypted.toString(C.enc.Utf8))
            if(req.body.password===decrypted.toString(C.enc.Utf8)){
                if(account.email_verified_at){
                    res.send({success:true,verified:true,message:"Login Successful!",data:account,sched:sched});
                }else{
                    res.send({success:false,verified:false,message:"Account not yet verified.",data:null});
                }
            }else{
                res.send({success:false,message:"The credentials provided does not match.",data:null});
            }
        }else{
            res.send({success:false,verified:true,message:"The credentials provided does not match.",data:null});
        }
    }else if(account && req.body.google_auth){
        if(account.google_auth){
            res.send({success:true,message:"Login Successful!",data:account});
        }else{
            res.send({success:false,message:"Account already existed.",data:null});
        }
    }else if(!account && req.body.google_auth){
        let acc=await user.model.create({email:req.body.email,password:req.body.fname+req.body.lname,fname:req.body.fname,lname:req.body.lname,image:req.body.image,google_auth:true,user_type:"Resident"});
        res.send({success:true,message:"Login Successful!",data:acc});
    }else{
        res.send({success:false,message:"Account not found.",data:null});
    }
}

exports.verifyEmail=async (req,res)=>{
    let account=await user.model.findOne({ where: { email: req.body.email } });
    if(account){
        let acc=await user.model.update({email_verified_at:moment()},{
            where:{
                email:req.body.email
            }
        })
        acc=await user.model.findOne({ where: { email: req.body.email } });
        let sched=await schedule.model.findOne({
            driver_id:acc.user_id
        });
        res.send({success:true,message:"Account verified.",data:acc,sched:sched});
    }else{
        res.send({success:false,message:"Account not found.",data:null});
    }
}