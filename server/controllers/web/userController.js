require('dotenv').config("./.env");
const user = require("../../models/user");
const express = require('express');
const jwt = require('jsonwebtoken');
var C = require("crypto-js");
const { Op} = require('sequelize');
const {generateAccessToken} = require('../../helpers/generateAccessToken');
var saltRounds = 10;



exports.registerEmployee = async(req, res) => {
    let data = await user.model.findAll({
        where:{
            email:req.body.email
        }
    })
    if(data.length === 0){
       req.body.password = "p@ssw0rd";
       var hash = C.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString();
    //    hash = bcrypt.hashSync(req.body.password,saltRounds);
    console.log( hash);
       req.body.password = hash;
       await user.model.create(req.body);
       return res.status(200).send("Sign-up success");
    }else{
        return res.status(207).send("Account Exists");
    }
}
exports.login = async(req, res) => {
    let data = await user.model.findOne({
        where:{
            email:req.body.email,
            user_type:"Admin",
            status:true
        }
    })
    console.log(data);
    if(data !== null ){
        
        var bytes  = C.AES.decrypt(data.password, process.env.SECRET_KEY);
        var originalText = bytes.toString(C.enc.Utf8);
        console.log(data.password,bytes);
        if(originalText === req.body.password && data.password != ""){
            const accessToken = generateAccessToken(data);
            // res.cookie("user_id",accessToken,{maxAge:100000000,httpOnly:true,path:"/"});
            // console.log(req.cookies.user_id);
            res.send({success:true,message:"Login Successful!",data:data, accessToken})
        }else{
            res.send({success:false,message:"The credentials provided does not match."});
        }
    }else{
        res.send({success:false,message:"Account not found."});
    }
}
exports.logout = async(req, res)=>{
    res.status(200).json("You logged out Successfully");
}
exports.display = async(req, res)=>{
    let drivers = await user.model.findAll({
        where:{
            user_type:"Driver",
            status:true
        }
    })
    let admins = await user.model.findAll({
        where:{
            user_type:"Admin",
            status:true
        }
    })
    let inactives = await user.model.findAll({
        where:{
            user_type:{[Op.not]: 'Resident'},
            status:false
        }
    })
    res.send({success:true,data:{admins:admins,drivers:drivers,inactives:inactives}});
}
exports.deactivate = async(req, res)=>{
    jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
        var decodedData=JSON.parse(decoded.user_id);
        var bytes  = C.AES.decrypt(decodedData.password, process.env.SECRET_KEY);
        var originalText = bytes.toString(C.enc.Utf8);
        if(originalText===req.body.password){
            await user.model.update({status:false},{
                where:{
                    email:req.body.email
                }
            })
            let drivers = await user.model.findAll({
                where:{
                    user_type:"Driver",
                    status:true
                }
            })
            let admins = await user.model.findAll({
                where:{
                    user_type:"Admin",
                    status:true
                }
            })
            let inactives = await user.model.findAll({
                where:{
                    user_type:{[Op.not]: 'Resident'},
                    status:false
                }
            })
            res.send({success:true,message:"Successfully deactivated employee.",data:{admins:admins,drivers:drivers,inactives:inactives}});
        }else{
            res.send({success:false,message:"Password did not match",data:null});
        }
    })
    
}
exports.activate = async(req, res)=>{
    jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
        var decodedData=JSON.parse(decoded.user_id);
        var bytes  = C.AES.decrypt(decodedData.password, process.env.SECRET_KEY);
        var originalText = bytes.toString(C.enc.Utf8);
        if(originalText===req.body.password){
            await user.model.update({status:true},{
                where:{
                    email:req.body.email
                }
            })
            let drivers = await user.model.findAll({
                where:{
                    user_type:"Driver",
                    status:true
                }
            })
            let admins = await user.model.findAll({
                where:{
                    user_type:"Admin",
                    status:true
                }
            })
            let inactives = await user.model.findAll({
                where:{
                    user_type:{[Op.not]: 'Resident'},
                    status:false
                }
            })
            res.send({success:true,message:"Successfully reactivated employee.",data:{admins:admins,drivers:drivers,inactives:inactives}});
        }else{
            res.send({success:false,message:"Password did not match",data:null});
        }
    })   
}
exports.register = async(req, res)=>{
    let acc = await user.model.findOne({
        where:{
            email:req.body.email
        }
    })
    if(acc===null){
        let password = 'p@ssw0rd' 
        acc=await user.model.create({
            email:req.body.email,
            password:C.AES.encrypt(password, process.env.SECRET_KEY).toString(),
            fname:req.body.fname,
            lname:req.body.lname,
            user_type:req.body.user_type,
            purok:req.body.purok,
            street:req.body.street,
            barangay:req.body.barangay,
            gender:req.body.gender,
            contact_no:req.body.contact
        });
        let drivers = await user.model.findAll({
            where:{
                user_type:"Driver",
                status:true
            }
        })
        let admins = await user.model.findAll({
            where:{
                user_type:"Admin",
                status:true
            }
        })
        let inactives = await user.model.findAll({
            where:{
                user_type:{[Op.not]: 'Resident'},
                status:false
            }
        })
        res.send({success:true,message:"Successfully added new employee",data:{admins:admins,drivers:drivers,inactives:inactives}});
    }else{
        res.send({success:false,message:"Account already existed.",data:null});
    }   
        
}
