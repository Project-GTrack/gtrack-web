const { Sequelize } = require("sequelize");
require('dotenv').config("../../.env");
const event=require("../../models/event");
const admin=require("../../models/user");
const attLine=require("../../models/attachment_line");
const attachment=require("../../models/attachment");

admin.model.hasMany(event.model, {foreignKey: 'admin_id', as: 'adminEvent'});
event.model.belongsTo(admin.model, {foreignKey: 'admin_id', as: 'eventAdmin'});
event.model.hasOne(attLine.model, {foreignKey: 'attachment_line_id', as: 'eventLine'});
attLine.model.hasOne(event.model, {foreignKey: 'attachment_line_id', as: 'lineEvent'});
// attLine.model.hasMany(attachment.model, {foreignKey: 'attachment_line_id', as:'lineAttachment'});
// attachment.model.belongsTo(attLine.model, {foreignKey: 'attachment_line_id', as: 'attachmentLine'});

exports.getEvents=async (req,res)=>{
    let posts=await event.model.findAll({
        where:{
            deletedAt:null
        },
        include:[{
            model: admin.model, as:"eventAdmin"
        },{
            model: attLine.model, as:"eventLine",
            include:[{
                model: attachment.model, as:"lineAttachment" //lineAttachment
            }]
        }]
    });
    if(posts!==null){
        res.send({success:true,data:posts});
    }else{
        res.send({success:false,data:null});
    }
}
