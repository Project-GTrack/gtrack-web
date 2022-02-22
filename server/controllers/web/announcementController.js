const { Sequelize } = require("sequelize");
require('dotenv').config("../../.env");
const announcement=require("../../models/announcement");
const attachment_line=require("../../models/attachment_line");
const attachment=require("../../models/attachment");
const admin=require("../../models/user");
const jwt=require("jsonwebtoken");

exports.viewAnnouncements = async(req, res) => {
    if(req.body.accessToken!= undefined){
        jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
            let staff = await admin.model.findOne({
                where:{
                    user_id:decoded.user_id
                }
            })
            let announcements=await announcement.model.findAll({
                where:{
                    deletedAt:null
                },
                include:[{
                    model: admin.model, as:"announcementAdmin"
                },{
                    model: attachment_line.model, as:"announcementLine",
                    include:[{
                        model: attachment.model, as:"lineAttachment"
                    }]
                }]
            });
            res.send({data:staff, posts:announcements});
        })
    }
   
}
exports.createAnnouncement = async(req, res) =>{
    if(req.body.accessToken!= undefined){
        jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
            let attline = await attachment_line.model.create();
            if(attline){
                let attachment = await attachment.model.create({
                    attachment_line_id:attLine.attachment_line_id,
                    filename: req.body.filename 
                });
                let post = await announcement.model.create({
                    title:req.body.title,
                    content:req.body.content,
                    attachment_line_id:attLine.attachment_line_id
                })
                if(post){
                    res.send({success:true,message:"Announcement created successfully!",data:post});
                }else{
                        res.send({success:false,message:"Failed to create announcement.",data:null});
                }
            }else{
                    res.send({success:false,message:"Attachment not created.",data:null});
            }
        })
    }
}