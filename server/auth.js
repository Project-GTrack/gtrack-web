const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");
const user = require("./models/user");
exports.userAuthorization = (req, res, next)=>{

}


exports.adminChecking = (req, res, next)=>{
    if(req.body.accesToken != undefined){
        jwt.verify(req.body.accesToken, process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{

            let data = await user.model.findOne({
                where:{
                    user_id:decoded.user_id
                }
            })
            if(data.user_type == "Admin"){
                next();
            }else{
                res.send({success:false});
            }
        })
    }else{
        res.send("NO TOKEN FOUND");
    }
}