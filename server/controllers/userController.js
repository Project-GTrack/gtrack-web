require('dotenv').config("./.env");
const user = require("../models/user");
const express = require('express');
const bcrypt=require("bcrypt");
const jwt = require('jsonwebtoken');

var saltRounds = 10;
let refreshTokens = []

const generateAccessToken = (user) =>{
    return jwt.sign({user_id: user.user_id},process.env.ACCESS_TOKEN_SECRET,{expireIn:'15m'})
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
    let user = await user.model.findAll({
        where:{
            email:req.body.email
        }
    })
    if(user.length != 0 ){
        if(bcrypt.compareSync(req.body.password, user.password) && user.password != ""){
            const accessToken = generateAccessToken(user);
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
            refreshTokens.push(refreshToken);
            res.json({accessToken:accessToken, refreshToken:refreshToken});
        }else{
            return res.status(201).json({});
        }
    }else{
        return res.status(202).json({});
    }
}
exports.logout = async(req, res)=>{
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.status(200).json("You logged out Successfully");
}
exports.token = async(req, res)=>{
    const refreshToken = req.body.token;
    if(refreshToken  == null) return res.sendStatus(401);
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err, user)=>{
        if(err) return res.sendStatus(403);
        const accessToken = generateAccessToken(user);
        res.json({ accessToken: accessToken })
    })
}