const { Sequelize } = require("sequelize");
require('dotenv').config("../../.env");
const announcement=require("../../models/announcement");
const admin=require("../../models/user");
const attLine=require("../../models/attachment_line");
const attachment=require("../../models/attachment");

admin.model.hasMany(announcement.model, {foreignKey: 'admin_id', as: 'adminAnnouncement'});
announcement.model.belongsTo(admin.model, {foreignKey: 'admin_id', as: 'announcementAdmin'});
announcement.model.hasOne(attLine.model, {foreignKey: 'attachment_line_id', as: 'announcementLine'});
attLine.model.hasOne(announcement.model, {foreignKey: 'attachment_line_id', as: 'lineAnnouncement'});
attLine.model.hasMany(attachment.model, {foreignKey: 'attachment_line_id', as:'lineAttachment'});
attachment.model.belongsTo(attLine.model, {foreignKey: 'attachment_line_id', as: 'attachementLine'});


exports.getAnnouncements=async (req,res)=>{
    let posts=await announcement.model.findAll({
        where:{
            deletedAt:null
        },
        include:[{
            model: admin.model, as:"announcementAdmin"
        },{
            model: attLine.model, as:"announcementLine",
            include:[{
                model: attachment.model, as:"lineAttachment"
            }]
        }]
    });
    if(posts!==null){
        res.send({success:true,data:posts});
    }else{
        res.send({success:false,data:null});
    }
}
