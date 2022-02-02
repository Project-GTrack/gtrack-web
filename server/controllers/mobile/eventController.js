const { Sequelize } = require("sequelize");
require('dotenv').config("../../.env");
const event=require("../../models/event");
const admin=require("../../models/user");

admin.model.hasMany(event.model, {foreignKey: 'admin_id', as: 'adminEvent'});
event.model.belongsTo(admin.model, {foreignKey: 'admin_id', as: 'eventAdmin'});

exports.getEvents=async (req,res)=>{
    let posts=await event.model.findAll({
        where:{
            deletedAt:null
        },
        include:[{
            model: admin.model, as:"eventAdmin"
        }]
    });
    if(posts!==null){
        res.send({success:true,data:posts});
    }else{
        res.send({success:false,data:null});
    }
}
