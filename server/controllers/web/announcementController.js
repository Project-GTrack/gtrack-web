const { Sequelize } = require("sequelize");
require('dotenv').config("../../.env");
const announcement=require("../../models/announcement");
const attachment_line=require("../../models/attachment_line");
const attachment=require("../../models/attachment");
const admin=require("../../models/user");
const jwt=require("jsonwebtoken");

exports.viewAnnouncements = async(req, res) => {
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
    console.log(announcements);
    res.send({ posts:announcements});

   
}
exports.createAnnouncement = async(req, res) =>{
    if(req.body.accessToken!= undefined){
        jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
            let attline = await attachment_line.model.create();
            if(attline){
                if(req.body.urls.length > 0){
                    for(let i = 0 ; i < req.body.urls.length; i++){
                        await attachment.model.create({
                            attachment_line_id:attline.attachment_line_id,
                            filename: req.body.urls[i] 
                        });
                    }
                }
                let post = await announcement.model.create({
                    admin_id:JSON.parse(decoded.user_id).user_id,
                    title:req.body.title,
                    content:req.body.content,
                    attachment_line_id:attline.attachment_line_id
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
exports.editAnnouncement = async(req, res) => {
    let announce = await announcement.model.findOne({
        where:{
            announcement_id: req.params.id
        }
    })
    // if(req.body.urls.length > 0){
        await attachment.model.destroy({
            where:{
                attachment_line_id : announce.attachment_line_id
            }
        });
        for(let i = 0 ; i < req.body.urls.length; i++){
            await attachment.model.create({
                attachment_line_id:announce.attachment_line_id,
                filename: req.body.urls[i] 
            });
        }
    // }
    let post = await announcement.model.update({
        title:req.body.title,
        content:req.body.content,
    },{
        where:{
            announcement_id: req.params.id
        }
    })
    announce = await announcement.model.findAll({
        include:[
            {model: admin.model, as:"announcementAdmin"},
            {model: attachment_line.model, as: 'announcementLine',
                include:[{
                    model: attachment.model, as:'lineAttachment'
                }]
            }
        ],
    });
    if(post){
        res.send({success:true,message:"Announcement updated successfully!",data:announce});
    }else{
        res.send({success:false,message:"Failed to create announcement.",data:null});
    }
 
   
}