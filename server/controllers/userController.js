require('dotenv').config("./.env");
const user = require("../models/user");
const express = require('express');
const bcrypt=require("bcrypt");
const jwt = require('jsonwebtoken');

var saltRounds = 10;


const generateAccessToken = (user) =>{
    return jwt.sign({user_id: user.user_id},process.env.ACCESS_TOKEN_SECRET)
}

exports.registerUser = async(req, res) => {
    let data = await user.model.findAll({
        where:{
            email:req.body.email
        }
    })
    if(data.length == 0){
       req.body.password = "p@ssw0rd";
       hash = bcrypt.hashSync(req.body.password,saltRounds);
       req.body.pasword = hash;
       await user.model.create(req.body);
       return res.status(200).send("Sign-up success");
    }else{
        return res.status(207).send("Account Exists");
    }
}
exports.login = async(req, res) => {
    console.log(req.body.email);
    let data = await user.model.findOne({
        where:{
            email:req.body.email
        }
    })
    console.log(data);
    if(data !== null ){
        if(bcrypt.compareSync(req.body.password, data.password) && data.password != ""){
            const accessToken = generateAccessToken(data);
            res.cookie("user_id",accessToken,{maxAge:100000000,httpOnly:true,path:"/"});
            res.status(200).send("Successfuly login");
        }else{
            res.send("Incorrect Password")
        }
    }else{
        res.send("Email not found!");
    }
}
exports.logout = async(req, res)=>{
    res.clearCookie("user_id");
    res.status(200).json("You logged out Successfully");
}
