const { Sequelize } = require("sequelize");
require('dotenv').config("../../.env");
const user = require("../models/user");
const truck = require("../models/truck");
const dumpster = require("../models/dumpster");
const collection = require("../models/waste_collection");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const {QueryTypes, Op} = require('sequelize');
const { sequelize } = require('../connection');
const moment = require('moment')
user.model.hasMany(collection.model,{
    foreignKey:'driver_id',as:'userCollection'
});
collection.model.belongsTo(user.model,{
    foreignKey:'driver_id',as:'collectionDriver'
});

exports.viewDashboard= async(req, res)=>{
    if(req.body.accessToken!= undefined){
        jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
            let admin = await user.model.findOne({
                where:{
                    user_id:decoded.user_id
                }
            })
             
            // let driversCount = await sequelize.query("SELECT user_id,fname,lname,email,contact_no,street,purok,barangay,town,createdAt FROM users"+ 
            // " WHERE createdAt >= LAST_DAY(NOW()) + INTERVAL 1 DAY - INTERVAL 1 MONTH AND createdAt < LAST_DAY(NOW())"+ 
            // " AND user_type = 'Driver' ");
            let driversCount = await user.model.findAll({
                attributes :{
                    exclude:['image','birthday','gender','postal_code','email_verified_at','password','remember_token','google_auth','updatedAt','deletedAt']
                },
                where:{
                   [Op.and]:[
                    sequelize.literal('createdAt >= LAST_DAY(NOW()) + INTERVAL 1 DAY - INTERVAL 1 MONTH'),
                    sequelize.literal('createdAt < LAST_DAY(NOW())'),
                    {user_type: 'Driver'}
                   ]
                }
            });

            // let trucksCount = await sequelize.query("SELECT truck_id,plate_no,model,createdAt FROM trucks"+
            // " WHERE createdAt >= LAST_DAY(NOW()) + INTERVAL 1 DAY - INTERVAL 1 MONTH AND createdAt < LAST_DAY(NOW()) AND active = 1");
            let trucksCount = await truck.model.findAll({
                attributes:{
                    exclude:['user_id','updatedAt','active','deletedAt']
                },
                where:{
                    [Op.and]:[
                     sequelize.literal('createdAt >= LAST_DAY(NOW()) + INTERVAL 1 DAY - INTERVAL 1 MONTH'),
                     sequelize.literal('createdAt < LAST_DAY(NOW())'),
                     {active: 1}
                    ]
                 }

            })

            // let dumpstersCount = await sequelize.query("SELECT dumpster_id,purok,street,barangay,createdAt FROM dumpsters"+
            // " WHERE createdAt >= LAST_DAY(NOW()) + INTERVAL 1 DAY - INTERVAL 1 MONTH AND createdAt < LAST_DAY(NOW())");
            let dumpstersCount = await dumpster.model.findAll({
                attributes:{
                    exclude:['admin_id','town','postal_code','latitude','longitude','complete','updatedAt','deletedAt']
                },
                where:{
                    [Op.and]:[
                     sequelize.literal('createdAt >= LAST_DAY(NOW()) + INTERVAL 1 DAY - INTERVAL 1 MONTH'),
                     sequelize.literal('createdAt < LAST_DAY(NOW())')
                    ]
                 }
            })


            // let collectionsCount = await sequelize.query("SELECT w.weight_id,w.collection_date,w.collection_route,w.collection_weight_volume,u.fname,u.lname,w.createdAt FROM waste_collections w"+
            // " INNER JOIN users u ON w.driver_id = u.user_id"+
            // " WHERE w.collection_date >= LAST_DAY(NOW()) + INTERVAL 1 DAY - INTERVAL 1 MONTH AND w.collection_date < LAST_DAY(NOW())");
            let collectionsCount = await collection.model.findAll({
                attributes:{
                    exclude:['collection_route','createdAt','updatedAt','deletedAt']
                },
               include: {
                   model : user.model, as:"collectionDriver",
                   required: true,
                    attributes:['fname','lname']
                
               },
               where:{
                    [Op.and]:[
                        sequelize.literal('collection_date >= LAST_DAY(NOW()) + INTERVAL 1 DAY - INTERVAL 1 MONTH'),
                        sequelize.literal('collection_date < LAST_DAY(NOW())')
                    ]    
               }
            });

            // let chartDataCount = await sequelize.query("SELECT collection_date, collection_weight_volume"+
            // " FROM waste_collections"+
            // " WHERE DAYNAME(collection_date) IN ('Sunday')")

            // let chartDataCount = await collection.model.findAll({
            //     attributes:{
            //         exclude:['driver_id','weight_id','collection_route','createdAt','updatedAt','deletedAt']
            //     },
            //     where:{
            //         [Op.and]:[
            //          sequelize.literal(`DAYNAME(collection_date) IN ('Sunday')`),
            //          sequelize.literal('collection_date >= LAST_DAY(NOW()) + INTERVAL 1 DAY - INTERVAL 1 MONTH'),
            //          sequelize.literal('collection_date < LAST_DAY(NOW())')
            //         ]
            //      }
            // })

                let day = moment()
                        .startOf('month')
                        .day('Sunday');
                if (day.date() > 7) day.add(7,'d');
                var month = day.month();
                let chartDataCount=[];
                var startDate = moment(moment().format("YYYY-MM-01"));
                var total_price=null;
                while(month === day.month()){
                    total_price = await collection.model.sum('collection_weight_volume',{
                        where: {
                            collection_date: {
                              [Op.between]: [startDate, day]
                            }
                        }
                    })
                    if(total_price){
                        chartDataCount.push({collection_weight_volume:total_price,collection_date:day.clone()})
                    }
                    startDate=day.clone();
                    day.add(7,'d');
                }
            res.send({data:admin, drivers:driversCount, trucks:trucksCount, dumpsters:dumpstersCount,
                        collections:collectionsCount,chartData:chartDataCount});
            
        })
    }else{
        res.status(400);
    }
}