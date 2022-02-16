const { Sequelize } = require("sequelize");
require('dotenv').config("../../.env");
var moment = require('moment');

const user=require("../../models/user");
const schedule=require("../../models/schedule");
const truck=require("../../models/truck");
const truck_assignment=require("../../models/truck_assignment");

schedule.model.belongsTo(user.model,{foreignKey: 'admin_id', as: 'scheduleAdmin'});
schedule.model.belongsTo(user.model,{foreignKey: 'driver_id', as: 'scheduleDriver'});
schedule.model.hasOne(truck_assignment.model,{foreignKey: 'assignment_id', as: 'scheduleTruckAssignment'});
truck_assignment.model.belongsTo(user.model,{foreignKey: 'driver_id', as: 'truckAssignmentDriver'});
truck_assignment.model.hasOne(truck.model,{foreignKey: 'truck_id', as: 'truckAssignmentTruck'});
truck.model.belongsTo(user.model,{foreignKey: 'user_id', as: 'truckUser'});

exports.display=async (req,res)=>{
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
                        let formatted=moment(day).format('YYYY-MM-DD');
                        dates.push({date:formatted,start_time:when.time_start,end_time:when.time_end,details:sched});
                        markedData.push(formatted);
                        day.add(7,'d');
                    }
                })
            }else{
                schedJson.when.forEach(function(when){
                    var formatted = moment(when.schedule).format('YYYY-MM-DD');
                    dates.push({date:formatted,start_time:when.time_start,end_time:when.time_end,details:sched});
                    markedData.push(formatted);
                })
            }
        });
        res.send({success:true,message:"Schedule retrieved successfully.",data:{schedule:dates,markedDate:markedData}});
    }else{
        res.send({success:false,message:"No schedule available",data:null});
    }
    
}