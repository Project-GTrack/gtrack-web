require('dotenv').config("./.env");
const user = require("../../models/user");
const express = require('express');
const jwt = require('jsonwebtoken');
var C = require("crypto-js");
const { Op} = require('sequelize');
const {generateAccessToken} = require('../../helpers/generateAccessToken');
exports.changePassword = async(req, res) => {
 
    if(req.body.accessToken != undefined){
        jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
            let admin = await user.model.findOne({
                where:{
                    user_id : JSON.parse(decoded.user_id).user_id,
                    user_type : 'Admin',
                    status:true
                }
            })
            if(admin !== null){
                var bytes  = C.AES.decrypt(admin.password, process.env.SECRET_KEY);
                var originalText = bytes.toString(C.enc.Utf8);
                if(originalText === req.body.password && admin.password != ""){  
                    let acc = await user.model.update({
                        password:C.AES.encrypt(req.body.newPassword, process.env.SECRET_KEY).toString(),
                    },{
                    where:{
                        email:admin.email
                    }
                    })
                    if(acc){
                        acc=await user.model.findOne({ where: { email: admin.email } });
                        res.send({success:true,message:"Password changed successfully.",data:acc});
                    }
                }else{
                    res.send({success:false,message:"The credentials provided does not match.",data:null});
                }

            }
        })
    }
}
exports.changeGeneral = async(req, res) => {
   
    if(req.body.accessToken != undefined){
        jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
            let admin = await user.model.findOne({
                where:{
                    user_id : JSON.parse(decoded.user_id).user_id,
                    user_type : 'Admin',
                    status:true
                }
            })
            if(admin !== null){
                let acc = await user.model.update({
                    fname: req.body.fname,
                    lname:req.body.lname,
                    image:req.body.image
                },{
                    where:{
                        email:admin.email
                    }
                })
                if(acc){
                    acc=await user.model.findOne({ 
                        where: { 
                            user_id : JSON.parse(decoded.user_id).user_id,
                        } 
                    });
                    const accessToken = generateAccessToken(acc);
                    res.send({success:true,message:"Update General Info successfully.",data:{acc,accessToken}});
                }else{
                    res.send({success:false,message:"Failed to update General Info.",data:null});
                }
            }
        })
    }
}
exports.changeAddress = async(req, res) => {
    if(req.body.accessToken != undefined){
        jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
            
            let admin = await user.model.findOne({
                where:{
                    user_id : JSON.parse(decoded.user_id).user_id,
                    user_type : 'Admin',
                    status:true
                }
            })
            if(admin !== null){
                let acc = await user.model.update({
                    purok: req.body.purok,
                    street:req.body.street,
                    barangay:req.body.barangay,
                    town:'Compostela',
                    postal_code:'6003'
                },{
                    where:{
                        email:admin.email
                    }
                })
                if(acc){
                    acc=await user.model.findOne({ 
                        where: { 
                            user_id : JSON.parse(decoded.user_id).user_id,
                        } 
                    });
                    const accessToken = generateAccessToken(acc);
                    res.send({success:true,message:"Update Address successfully.",data:{acc,accessToken}});
                }else{
                    res.send({success:false,message:"Failed to update Address.",data:null});
                }
            }
        })
    }
}
exports.changeInfo = async(req, res)=>{
    if(req.body.accessToken != undefined){
        jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
            
            let admin = await user.model.findOne({
                where:{
                    user_id : JSON.parse(decoded.user_id).user_id,
                    user_type : 'Admin',
                    status:true
                }
            })
            if(admin !== null){
                let acc = await user.model.update({
                    gender: req.body.gender,
                    contact_no:req.body.contact_no,
                    birthday:req.body.birthday
                },{
                    where:{
                        email:admin.email
                    }
                })
                if(acc){
                    acc=await user.model.findOne({ 
                        where: { 
                            user_id : JSON.parse(decoded.user_id).user_id,
                        } 
                    });
                    const accessToken = generateAccessToken(acc);
                    res.send({success:true,message:"Update Info successfully.",data:{acc,accessToken}});
                }else{
                    res.send({success:false,message:"Failed to update info.",data:null});
                }
            }
        })
    }
}