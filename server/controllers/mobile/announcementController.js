const { Sequelize } = require("sequelize");
require('dotenv').config("../../.env");
const announcement=require("../../models/announcement");
const admin=require("../../models/user");
const attLine=require("../../models/attachment_line");
const attachment=require("../../models/attachment");


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
