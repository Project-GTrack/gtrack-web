const { Sequelize, Op } = require("sequelize");
require('dotenv').config("../../.env");
const assignment = require("../../models/truck_assignment");
const user = require("../../models/user");
const schedule = require("../../models/schedule");
const truck = require("../../models/truck");
const jwt=require("jsonwebtoken");
var C = require("crypto-js");
const { sequelize } = require('../../connection');

assignment.model.hasMany(schedule.model, {foreignKey:"assignment_id", as: "assignmentSchedule"});

exports.addAssignment = async (req,res) => {
    if(req.body.accessToken!= undefined){
        jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
            let checkAssigned = await assignment.model.findOne({
                where:{
                    driver_id:req.body.driver_id,
                    truck_id: req.body.truck_id   
                }
            })
            if(checkAssigned){
                res.send({success:false,message:"Truck assignment already exist",data:null});
            }else{
                let assigned = await assignment.model.create(req.body);
                res.send({success:true,message:"Truck Assignment successfully Created"});
            }
            
        })
        
    }
    
}
exports.editAssignment = async (req,res) => {
    if(req.body.accessToken!= undefined){
        jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
                let checkAssign = await assignment.model.findOne({
                    where:{
                        driver_id:req.body.driver_id,
                        truck_id:req.body.truck_id
                    }
                })
                if(!checkAssign){
                    checkAssign = await assignment.model.update(req.body,{
                        where:{
                            assignment_id:req.params.id,
                            [Op.or]:[{
                                driver_id: {
                                    [Op.ne]: req.body.driver_id
                                },
                            },{
                                truck_id: {
                                    [Op.ne]: req.body.truck_id
                                } 
                            }]
                        }
                    })
                    res.send({success:true,message:"Truck Assignment successfully Updated"});
                }else{
                    res.send({success:false,message:"Truck assignment already exist",data:null});
                }
            
        })
        
    }
}

exports.deleteAssignment = async (req,res) => {
    if(req.body.accessToken!= undefined){
        jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
            var bytes  = C.AES.decrypt(JSON.parse(decoded.user_id).password, process.env.SECRET_KEY);
            var originalText = bytes.toString(C.enc.Utf8);
            if(originalText === req.body.password){
                let assign = await assignment.model.destroy({
                    where:{
                        assignment_id:req.params.id
                    }
                })
                res.send({success:true,message:"Truck assignment successfully Deleted"});
            }else{
                res.send({success:false,message:"Password did not match",data:null});
            }
        })
        
    }
}
