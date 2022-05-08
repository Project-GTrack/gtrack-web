const { Sequelize } = require("sequelize");
require('dotenv').config("../../.env");
var moment = require('moment');
const jwt = require('jsonwebtoken');
var C = require("crypto-js");

const user=require("../../models/user");
const schedule=require("../../models/schedule");
const truck=require("../../models/truck");
const truck_assignment=require("../../models/truck_assignment");
const req = require("express/lib/request");

// schedule.model.belongsTo(user.model,{foreignKey: 'admin_id', as: 'scheduleAdmin'});
// schedule.model.belongsTo(user.model,{foreignKey: 'driver_id', as: 'scheduleDriver'});
// schedule.model.hasOne(truck_assignment.model,{foreignKey: 'assignment_id', as: 'scheduleTruckAssignment'});
// truck_assignment.model.belongsTo(user.model,{foreignKey: 'driver_id', as: 'truckAssignmentDriver'});
// truck_assignment.model.hasOne(truck.model,{foreignKey: 'truck_id', as: 'truckAssignmentTruck'});
// truck.model.belongsTo(user.model,{foreignKey: 'user_id', as: 'truckUser'});

// exports.display=async (req,res)=>{
//     var collection_sched=await schedule.model.findAll({
//         include:[{
//             model:user.model, as:"scheduleDriver"
//         },
//         {
//             model:truck_assignment.model, as:"scheduleTruckAssignment",
//             include:[{
//                 model:truck.model, as:"truckAssignmentTruck"
//             }]
//         }]
//     })
//     var dates=[];
//     var markedData=[];
//     if(collection_sched.length!==0){
//         collection_sched.forEach(function(sched){
//             var schedJson=JSON.parse(sched.schedule);
//             if(schedJson.type==="weekly"){
//                 schedJson.when.forEach(function(when){
//                     var day = moment()
//                         .startOf('month')
//                         .day(when.schedule);
//                     if (day.date() > 7) day.add(7,'d');
//                     var month = day.month();
//                     while(month === day.month()){
//                         let formatted=moment(day);
//                         dates.push({date:formatted,start_time:when.time_start,end_time:when.time_end,details:sched});
//                         markedData.push(formatted);
//                         day.add(7,'d');
//                     }
//                 })
//             }else{
//                 schedJson.when.forEach(function(when){
//                     var formatted = moment(when.schedule);
//                     dates.push({date:formatted,start_time:when.time_start,end_time:when.time_end,details:sched});
//                     markedData.push(formatted);
//                 })
//             }
//         });
//         res.send({success:true,message:"Schedule retrieved successfully.",data:{schedule:dates,markedDate:markedData}});
//     }else{
//         res.send({success:false,message:"No schedule available",data:null});
//     }
    
// }

const getSchedCalendar=async()=>{
    var collection_sched=await schedule.model.findAll({
        include:[{
            model:user.model, as:"scheduleDriver"
        },
        {
            model:truck_assignment.model, as:"scheduleTruckAssignment",
            include:[{
                model:truck.model, as:"truckAssignmentTruck"
            }]
        }]
    })
    var dates=[];
    var markedData=[];
    if(collection_sched.length!==0){
        collection_sched.forEach(function(sched){
            var schedJson=JSON.parse(sched.schedule);
            if(schedJson.type==="weekly"){
                schedJson.when.forEach(function(when){
                    var day = moment()
                        .startOf('month')
                        .day(when.schedule);
                    if (day.date() > 7) day.add(7,'d');
                    var month = day.month();
                    while(month === day.month()){
                        let formatted=moment(day);
                        dates.push({date:formatted,start_time:when.time_start,end_time:when.time_end,details:sched});
                        markedData.push(formatted);
                        day.add(7,'d');
                    }
                })
            }else{
                schedJson.when.forEach(function(when){
                    var formatted = moment(when.schedule);
                    dates.push({date:formatted,start_time:when.time_start,end_time:when.time_end,details:sched});
                    markedData.push(formatted);
                })
            }
        });
        return {schedule:dates,markedDate:markedData};
    }else{
        return null;
    }
}
exports.getDriversAssignments=async (req,res)=>{
    var drivers=await user.model.findAll({
        where:{
            user_type:"Driver",
            status:true
        }
    })
    var assignments=await truck_assignment.model.findAll({
        include:[
            {model:truck.model, as:"truckAssignmentTruck"},
            {model:user.model, as:"truckAssignmentDriver"},
        ]
    })
    res.send({success:true,message:"Details retrieved successfully.",data:{drivers:drivers,assignments:assignments}});
}
const getDrivers=async()=>{
    var drivers=await user.model.findAll({
        where:{
            user_type:"Driver",
            status:true
        }
    })
    return drivers?drivers:null;
}
const getTruckAssignments=async()=>{
    let assignments = await truck_assignment.model.findAll({
        order: [['createdAt','DESC']],
        include:[{
            model: user.model, as: "truckAssignmentDriver"
        },{
            model: schedule.model, as: "assignmentSchedule"
        },{
            model: truck.model, as: "truckAssignmentTruck"
        }]
    })
    return assignments?assignments:null;
}
const getTrucks=async()=>{
    let trucks = await truck.model.findAll({
        where:{
            active:1
        }
    })
    return trucks?trucks:null;
}
exports.addSchedule=async (req,res)=>{
    let sched=await schedule.model.create(req.body);
    if(sched){
        sched=await schedule.model.findAll({
            include:[
                {model:user.model, as:"scheduleDriver"},
            ]
        })
        res.send({success:true,message:"Schedule successfully Created",data:sched});
    }else{
        res.send({success:false,message:"Cannot add new schedule",data:null});
    }
}

exports.getScheduleTruckAssignment=async (req,res)=>{
    let sched=await schedule.model.findAll({
        order: [['createdAt','DESC']],
        include:[
            {model:user.model, as:"scheduleDriver"},
        ]
    })
    let calendar=await getSchedCalendar();
    let drivers=await getDrivers();
    let assignments=await getTruckAssignments();
    let trucks=await getTrucks();
    
    res.send({success:true,message:"Schedules obtained successfully",data:{schedule:sched,calendar,drivers,assignments,trucks}});
}

exports.updateSchedule=async (req,res)=>{
    let sched=await schedule.model.update(req.body,{
        where:{
            schedule_id:req.params.id
        }
    });
    if(sched){
        res.send({success:true,message:"Schedule successfully Updated"});
    }else{
        res.send({success:false,message:"Cannot update schedule",data:null});
    }
}

exports.deleteSchedule=async (req,res)=>{
    jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
        var decodedData=JSON.parse(decoded.user_id);
        var bytes  = C.AES.decrypt(decodedData.password, process.env.SECRET_KEY);
        var originalText = bytes.toString(C.enc.Utf8);
        if(originalText===req.body.password){
            let sched=await schedule.model.destroy({
                where:{
                    schedule_id:req.params.id
                }
            });
            if(sched){
                res.send({success:true,message:"Schedule successfully Deleted."});
            }else{
                res.send({success:false,message:"Cannot delete schedule",data:null});
            }
        }else{
            res.send({success:false,message:"Password did not match",data:null});
        }
    })
}

exports.deleteScheduleNew = async (req,res) => {
    if (req.body.accessToken) {
        let schedules = await schedule.model.destroy({
            where:{
                schedule_id:req.params.id
            }
        });

        if (schedules) {
            res.send({success:true,message:"Schedule successfully Deleted."});
        } else {
            res.send({success:false,message:"Something went wrong",data:null});
        }
    }
}