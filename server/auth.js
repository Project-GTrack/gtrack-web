const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");
const user = require("./models/user");
exports.userAuthorization = (req, res, next)=>{

}


exports.adminChecking = (req, res, next)=>{
    if(req.cookies.user_id !== undefined){
        jwt.verify(req.cookies.user_id, process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
            let data = await user.model.findOne({
                where:{
                    user_id:decoded.user_id
                }
            })
            if(data.user_type == "Admin"){
                next();
            }else{
                res.status(400).send("You are not allowed");
            }
        })
    }else{
        res.status(400);
    }
}