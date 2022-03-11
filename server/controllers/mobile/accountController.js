const { Sequelize } = require("sequelize");
require('dotenv').config("../../.env");
const user=require("../../models/user");
const schedule=require("../../models/schedule");
var C = require("crypto-js");
var moment = require('moment');
const { Op} = require('sequelize');
const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]  
var x,y;
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
    let account = await user.model.findOne({where:{email:req.body.email,user_type:{ [Op.not]: 'Admin'},status:true}});
    let sched = await schedule.model.findAll({
        where:{
            driver_id:account.user_id,
        }
    });
    if(sched.length != 0){
        for(x = 0;x < sched.length;x++){
            if(JSON.parse(sched[x].schedule).type === "weekly"){
                for(y = 0;y<JSON.parse(sched[x].schedule).when.length && days.indexOf(JSON.parse(sched[x].schedule).when[y].schedule) !== moment().day();y++){}
                console.log("weekly",y);
            }else{
                for(y = 0;y<JSON.parse(sched[x].schedule).when.length && moment(JSON.parse(sched[x].schedule).when[y].schedule).format('YYYY-MM-DD') !== moment().toISOString().split('T')[0];y++){}
                console.log("specific",y);
            }
            console.log(y,JSON.parse(sched[x].schedule).when.length)
            if(y!==JSON.parse(sched[x].schedule).when.length){
                account = await user.model.findOne({where:{email:req.body.email}, include:[{
                    model: schedule.model, as: "userSchedule",
                    where:{
                        schedule_id:sched[x].schedule_id,
                    }
                }]});
            }
          
        }
    }
    if(account && !req.body.google_auth){
        if(!account.google_auth){
            var decrypted = C.AES.decrypt(account.password,process.env.SECRET_KEY);
            // console.log(req.body.password,decrypted.toString(C.enc.Utf8))
            if(req.body.password===decrypted.toString(C.enc.Utf8)){
                // if(account.email_verified_at){
                    res.send({success:true,message:"Login Successful!",data:account});
                // }else{
                //     res.send({success:false,verified:false,message:"Account not yet verified.",data:null});
                // }
            }else{
                res.send({success:false,message:"The credentials provided does not match.",data:null});
            }
        }else{
            res.send({success:false,message:"Account has existing record.",data:null});
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
        acc = await user.model.findOne({where:{email:req.body.email}});
        let sched = await schedule.model.findAll({
            where:{
                driver_id:acc.user_id,
            }
        });
        if(sched.length != 0){
            for(x = 0;x < sched.length;x++){
                if(JSON.parse(sched[x].schedule).type === "weekly"){
                    for(y = 0;y<JSON.parse(sched[x].schedule).when.length && days.indexOf(JSON.parse(sched[x].schedule).when[y].schedule) !== moment().day();y++){}
                    console.log("weekly",y);
                }else{
                    for(y = 0;y<JSON.parse(sched[x].schedule).when.length && moment(JSON.parse(sched[x].schedule).when[y].schedule).format('YYYY-MM-DD') !== moment().toISOString().split('T')[0];y++){}
                    console.log("specific",y);
                }
                console.log(y,JSON.parse(sched[x].schedule).when.length)
                if(y!==JSON.parse(sched[x].schedule).when.length){
                    acc = await user.model.findOne({where:{email:req.body.email}, include:[{
                        model: schedule.model, as: "userSchedule",
                        where:{
                            schedule_id:sched[x].schedule_id,
                        }
                    }]});
                }
            
            }
        }
        res.send({success:true,message:"Account verified.",data:acc});
    }else{
        res.send({success:false,message:"Account not found.",data:null});
    }
}

exports.resetPassword=async (req,res)=>{
    let account=await user.model.findOne({ 
        where: { 
            email: req.body.email,
            user_type:{ [Op.not]: 'Admin'},
            google_auth:{ [Op.not]: true},
            status:true
        } 
    });
    if(account){
        res.send({success:true,message:"Account retrieved.",data:account});
    }else{
        res.send({success:false,message:"Account not found or is already associated with Google account",data:null});
    }
}