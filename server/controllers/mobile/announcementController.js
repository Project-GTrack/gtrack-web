const { Sequelize } = require("sequelize");
require('dotenv').config("../../.env");
const announcement=require("../../models/announcement");
const admin=require("../../models/user");

admin.model.hasMany(announcement.model, {foreignKey: 'admin_id', as: 'adminAnnouncement'});
announcement.model.belongsTo(admin.model, {foreignKey: 'admin_id', as: 'announcementAdmin'});

exports.getAnnouncements=async (req,res)=>{
    let posts=await announcement.model.findAll({
        where:{
            deletedAt:null
        },
        include:[{
            model: admin.model, as:"announcementAdmin"
        }]
    });
    if(announcement!==null){
        res.send({success:true,data:posts});
    }else{
        res.send({success:false,data:null});
    }
}
