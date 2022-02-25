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

exports.getAssignments = async (req,res) => {
    let assignments = await assignment.model.findAll({
        include:[{
            model: user.model, as: "truckAssignmentDriver"
        },{
            model: schedule.model, as: "assignmentSchedule"
        },{
            model: truck.model, as: "truckAssignmentTruck"
        }]
    })
    if(assignments){
        console.log(truck);
        res.send({success:true, data:assignments});
    }else{
        console.log("NO assin");
        res.send({success:false, data:null});
    }
}
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
                if(assigned){
                    assigned = await assignment.model.findAll({
                        include:[{
                            model: user.model, as: "truckAssignmentDriver"
                        },{
                            model: schedule.model, as: "assignmentSchedule"
                        },{
                            model: truck.model, as: "truckAssignmentTruck"
                        }]
                    })
                    res.send({success:true,message:"New truck assignment is added",data:assigned});
                }else{
                    res.send({success:false,message:"Cannot add truck assignment",data:null});
                }
            }
            
        })
        
    }
    
}

exports.getDriversAndTrucks = async (req,res) => {
    let drivers = await user.model.findAll({
        where:{
            user_type:"Driver"
        }
    })
    let trucks = await truck.model.findAll({
        where:{
            active:1
        }
    })
    res.send({success:true, data:{drivers:drivers,trucks:trucks}});
}

exports.editAssignment = async (req,res) => {
    if(req.body.accessToken!= undefined){
        jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
                let assign = 0;
                let checkAssign = await assignment.model.findOne({
                    where:{
                        driver_id:req.body.driver_id,
                        truck_id:req.body.truck_id
                    }
                })
                console.log(checkAssign);
                if(!checkAssign){
                    assign = await assignment.model.update(req.body,{
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
                
                }
                if(assign != 0){
                    assign = await assignment.model.findAll({
                        include:[{
                            model: user.model, as: "truckAssignmentDriver"
                        },{
                            model: schedule.model, as: "assignmentSchedule"
                        },{
                            model: truck.model, as: "truckAssignmentTruck"
                        }]
                    })
                    res.send({success:true,message:"Truck assignment has been updated",data:assign});
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
                assign = await assignment.model.findAll({
                    include:[{
                        model: user.model, as: "truckAssignmentDriver"
                    },{
                        model: schedule.model, as: "assignmentSchedule"
                    },{
                        model: truck.model, as: "truckAssignmentTruck"
                    }]
                })
                res.send({success:true,message:"Truck assignment has been deleted",data:assign});
            }else{
                res.send({success:false,message:"Password did not match",data:null});
            }
        })
        
    }
}
