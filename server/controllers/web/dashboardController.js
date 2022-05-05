const { Sequelize } = require("sequelize");
require('dotenv').config("../../.env");
const user = require("../../models/user");
const truck = require("../../models/truck");
const dumpster = require("../../models/dumpster");
const collection = require("../../models/waste_collection");
const jwt=require("jsonwebtoken");
const {QueryTypes, Op} = require('sequelize');
const { sequelize } = require('../../connection');
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
                    user_type: 'Driver',
                    status: 1
                }
            });

            // let trucksCount = await sequelize.query("SELECT truck_id,plate_no,model,createdAt FROM trucks"+
            // " WHERE createdAt >= LAST_DAY(NOW()) + INTERVAL 1 DAY - INTERVAL 1 MONTH AND createdAt < LAST_DAY(NOW()) AND active = 1");
            let trucksCount = await truck.model.findAll({
                attributes:{
                    exclude:['user_id','updatedAt','active','deletedAt']
                },
                where:{
                   active: 1
                 }

            })

            // let dumpstersCount = await sequelize.query("SELECT dumpster_id,purok,street,barangay,createdAt FROM dumpsters"+
            // " WHERE createdAt >= LAST_DAY(NOW()) + INTERVAL 1 DAY - INTERVAL 1 MONTH AND createdAt < LAST_DAY(NOW())");
            let dumpstersCount = await dumpster.model.findAll({
                attributes:{
                    exclude:['admin_id','town','postal_code','latitude','longitude','complete','updatedAt','deletedAt']
                },
                where:{
                    deletedAt:null
                },
            })


            // let collectionsCount = await sequelize.query("SELECT w.weight_id,w.collection_date,w.collection_route,w.collection_weight_volume,u.fname,u.lname,w.createdAt FROM waste_collections w"+
            // " INNER JOIN users u ON w.driver_id = u.user_id"+
            // " WHERE w.collection_date >= LAST_DAY(NOW()) + INTERVAL 1 DAY - INTERVAL 1 MONTH AND w.collection_date < LAST_DAY(NOW())");
            let collectionsCount = await collection.model.findAll({
                attributes:{
                    exclude:['updatedAt','deletedAt']
                },
               include: {
                   model : user.model, as:"collectionDriver",
                   required: true,
                    attributes:['fname','lname']
                
               },
               where:{
                    [Op.and]:[
                        sequelize.literal('collection_date >= LAST_DAY(NOW()) + INTERVAL 1 DAY - INTERVAL 1 MONTH'),
                        sequelize.literal('collection_date <= LAST_DAY(NOW())')
                    ]    
               }
            });
            
            let queryString1 = "SELECT SUM(collection_weight_volume) AS weight,CONCAT(STR_TO_DATE(CONCAT(YEARWEEK(collection_date, 2), ' Sunday'), '%X%V %W'),'&',STR_TO_DATE(CONCAT(YEARWEEK(collection_date, 2), ' Sunday'), '%X%V %W') + INTERVAL 6 DAY) AS week FROM waste_collections WHERE MONTH(collection_date) = MONTH(CURRENT_DATE()) GROUP BY YEARWEEK(collection_date, 2) ORDER BY YEARWEEK(collection_date, 2) ";
            let queryString2 = "SELECT  MONTHNAME(collection_date) as month,SUM(collection_weight_volume) as weight FROM waste_collections GROUP BY MONTH(collection_date);";
            let queryString3 ="SELECT  YEAR(collection_date) as year,SUM(collection_weight_volume) as weight FROM waste_collections GROUP BY YEAR(collection_date);";
            let chartDataCount = await sequelize.query(queryString1,{type: sequelize.QueryTypes.SELECT});
            let monthlyData = await sequelize.query(queryString2,{type: sequelize.QueryTypes.SELECT});
            let yearlyData = await sequelize.query(queryString3,{type: sequelize.QueryTypes.SELECT});
            // chartDataCount.push(monthlyData);
            // chartDataCount.push(yearlyData);
            
         
            res.send({data:admin, drivers:driversCount, trucks:trucksCount, dumpsters:dumpstersCount,
                        collections:collectionsCount,chartData:chartDataCount,monthData:monthlyData,yearData:yearlyData});
            
        })
    }else{
        res.status(400);
    }
}