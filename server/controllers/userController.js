require('dotenv').config("./.env");
const user = require("../models/user");
const express = require('express');
const bcrypt=require("bcrypt");
const jwt = require('jsonwebtoken');

var saltRounds = 10;


const generateAccessToken = (user) =>{
    return jwt.sign({user_id: user.user_id},process.env.ACCESS_TOKEN_SECRET)
}

exports.registerEmployee = async(req, res) => {
    let data = await user.model.findAll({
        where:{
            email:req.body.email
        }
    })
    if(data.length === 0){
       req.body.password = "p@ssw0rd";
       hash = bcrypt.hashSync(req.body.password,saltRounds);
       req.body.password = hash;
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
            email:req.body.email,
            user_type:"Admin"
        }
    })
    console.log(data);
    if(data !== null ){
        if(bcrypt.compareSync(req.body.password, data.password) && data.password != ""){
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



// Additional user functions (For Employees)

//Need to test this first
exports.deleteUser = async(req,res) => {
    let data = user.model.destroy({
        where:{
            user_id: req.params.id //Id of the user I wanna delete will be passed (this id should be stored in the delete button) 
        }
    }).then(function(rowDeleted){
        if(rowDeleted===1){
            res.send({value:data}); 
            console.log('Record Deleted Successfully');
        }
    }, function(err){
        console.log(err);
    })
}


//Need to test this first
exports.updateUser = async(req,res) => {
    //add the needed data to do the updates
    const updateObject = req.body
    //Medj big bug ni siya kay if mag send ka part sa object og new password ma change siya so if naa password apil sa req 
    //matic error
    if (req.body.password) {
        return res.status(500).send('something went wrong');
    }

    let data = await user.model.update(updateObject, {
        where:{
            user_id: req.params.id
        }
    })
    
    if (data) {
        res.send({value:data}); 
        console.log('record has been updated');
    }
}