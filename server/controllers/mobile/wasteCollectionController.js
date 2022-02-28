const { Sequelize, Op } = require("sequelize");
require('dotenv').config("../../.env");
var C = require("crypto-js");
const moment = require("moment");
const waste_collection=require("../../models/waste_collection");
const schedule = require("../../models/schedule");


exports.getRoutes = async (req,res) => {
    let route = "";
    let sched = await schedule.model.findAll({
        where:{
            driver_id:req.params.id,
        }
    });
    if(sched.length > 0){
        var x,i;
        for(x = 0;x < sched.length; x++){
            for(i = 0; i < JSON.parse(sched[x].schedule).when.length;i++){
                var date = JSON.parse(sched[x].schedule).when[i].schedule;
                if(date === moment().format("dddd") || date === moment().format("MM-DD-YY")){
                    var street = sched[x].street.charAt(0).toUpperCase() + sched[x].street.slice(1);
                    var purok = sched[x].purok.charAt(0).toUpperCase() + sched[x].purok.slice(1);
                    var barangay = sched[x].barangay.charAt(0).toUpperCase() + sched[x].barangay.slice(1);
                    route = street+", "+purok+", "+barangay;
                    res.send({success:true,data:route});
                }
            }
        }
        if(route === "" && x === sched.length){
            res.send({success:false,message:"You have no schedule today",data:null});
        }
        
    }
}

exports.submitCollection = async (req, res) => {
    var data = {
        date:req.body.date,
        start_time:req.body.start_time,
        end_time:req.body.end_time,
    }
    let waste=waste_collection.model.create({
        driver_id:req.params.id,
        collection_weight_volume:req.body.collection_weight_volume,
        collection_date:JSON.stringify(data),
        collection_route:req.body.collection_route
    })
   res.send({success:true,message:"Submitted Successfully"});
}
