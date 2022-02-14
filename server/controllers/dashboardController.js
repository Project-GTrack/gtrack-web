const { Sequelize } = require("sequelize");
require('dotenv').config("../../.env");
const user = require("../models/user");
const truck = require("../models/truck");
const dumpster = require("../models/dumpster");
const collection = require("../models/waste_collection");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const {QueryTypes} = require('sequelize');
const { sequelize } = require('../connection');

exports.viewDashboard= async(req, res)=>{
    if(req.body.accessToken!= undefined){
        jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
            let admin = await user.model.findOne({
                where:{
                    user_id:decoded.user_id
                }
            })
             
            let driversCount = await sequelize.query("SELECT user_id,fname,lname,email,contact_no,street,purok,barangay,town,createdAt FROM users"+ 
            " WHERE createdAt >= LAST_DAY(NOW()) + INTERVAL 1 DAY - INTERVAL 1 MONTH AND createdAt < LAST_DAY(NOW())"+ 
            " AND user_type = 'Driver' ");
           
            let trucksCount = await sequelize.query("SELECT truck_id,plate_no,model,createdAt FROM trucks"+
            " WHERE createdAt >= LAST_DAY(NOW()) + INTERVAL 1 DAY - INTERVAL 1 MONTH AND createdAt < LAST_DAY(NOW()) AND active = 1");

            let dumpstersCount = await sequelize.query("SELECT dumpster_id,purok,street,barangay,createdAt FROM dumpsters"+
            " WHERE createdAt >= LAST_DAY(NOW()) + INTERVAL 1 DAY - INTERVAL 1 MONTH AND createdAt < LAST_DAY(NOW())");

            let collectionsCount = await sequelize.query("SELECT w.weight_id,w.collection_date,w.collection_route,w.collection_weight_volume,u.fname,u.lname,w.createdAt FROM waste_collections w"+
            " INNER JOIN users u ON w.driver_id = u.user_id"+
            " WHERE w.createdAt >= LAST_DAY(NOW()) + INTERVAL 1 DAY - INTERVAL 1 MONTH AND w.createdAt < LAST_DAY(NOW())");

            let chartDataCount = await sequelize.query("SELECT collection_date, collection_weight_volume"+
            " FROM waste_collections"+
            " WHERE DAYNAME(collection_date) IN ('Sunday')")
            res.send({data:admin, drivers:driversCount[0], trucks:trucksCount[0], dumpsters:dumpstersCount[0],
                        collections:collectionsCount[0],chartData:chartDataCount[0]});
            
        })
    }else{
        res.status(400);
    }
}