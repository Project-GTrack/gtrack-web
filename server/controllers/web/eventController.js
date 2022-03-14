const { Sequelize } = require("sequelize");
require('dotenv').config("../../.env");
const event=require("../../models/event");
const attachment_line=require("../../models/attachment_line");
const attachment=require("../../models/attachment");
const admin=require("../../models/user");
const jwt=require("jsonwebtoken");
var C = require("crypto-js");

exports.viewEvents = async(req, res) => {
    let events = await event.model.findAll({
        where: {
            deletedAt : null
        },
        include:[{
            model: admin.model, as:"eventAdmin"
        },{
            model: attachment_line.model, as:"eventLine",
            include:[{
                model: attachment.model, as:"lineAttachment"
            }]
        }]
    })
    res.send({data:events})
}

exports.createEvent = async(req, res) => {
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
                let post = await event.model.create({
                    admin_id : JSON.parse(decoded.user_id).user_id,
                    event_name : req.body.event_name,
                    description : req.body.description,
                    target_participants : req.body.participants,
                    startDate : req.body.startDate,
                    endDate : req.body.endDate,
                    street : req.body.street,
                    purok:req.body.purok,
                    barangay : req.body.barangay,
                    town : req.body.town,
                    postal_code : req.body.postal_code,
                    target_participants: req.body.target_participants,
                    attachment_line_id:attline.attachment_line_id,
                    registration_form_url:req.body.registration_form_url,
                    status: "Ongoing"
                })
                if(post){
                    res.send({success:true,message:"Event created successfully!"});
                }else{
                    res.send({success:false,message:"Failed to create event."});
                }
            }else{
                res.send({success:false,message:"Attachment not created."});
        }
        })
    }

}

exports.editEvent = async(req, res) => {
    let post = await event.model.findOne({
        where:{
            event_id : req.params.id
        }
    })

    await attachment.model.destroy({
        where:{
            attachment_line_id : post.attachment_line_id
        }
    });
    for(let i = 0 ; i < req.body.urls.length; i++){
        await attachment.model.create({
            attachment_line_id:post.attachment_line_id,
            filename: req.body.urls[i] 
        });
    }
    let result = await event.model.update({
        event_name : req.body.event_name,
        description : req.body.description,
        target_participants : req.body.participants,
        startDate : req.body.startDate,
        endDate : req.body.endDate,
        street : req.body.street,
        purok:req.body.purok,
        barangay : req.body.barangay,
        town : req.body.town,
        postal_code : req.body.postal_code,
        target_participants: req.body.target_participants,
        registration_form_url:req.body.registration_form_url,
        status: req.body.status
    },{
        where:{
            event_id : req.params.id
        }
    })
    let events = await event.model.findAll({
        where: {
            deletedAt : null
        },
        include:[{
            model: admin.model, as:"eventAdmin"
        },{
            model: attachment_line.model, as:"eventLine",
            include:[{
                model: attachment.model, as:"lineAttachment"
            }]
        }]
    })
    if(result){
        res.send({success:true,message:"Event updated successfully!",data:events});
    }else{
        res.send({success:false,message:"Failed to update event.",data:null});
    }

}
exports.deleteEvent = async(req, res) => {
    if(req.body.accessToken != undefined){
        jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
            var bytes  = C.AES.decrypt(JSON.parse(decoded.user_id).password, process.env.SECRET_KEY);
            var originalText = bytes.toString(C.enc.Utf8);
            if(originalText === req.body.password){
                let post = await event.model.findOne({
                    where:{
                        event_id:req.params.id
                    }
                })
                await attachment.model.destroy({
                    where:{
                        attachment_line_id : post.attachment_line_id
                    }
                });
                await attachment_line.model.destroy({
                    where:{
                        attachment_line_id : post.attachment_line_id
                    }
                })
                post = await event.model.destroy({
                    where:{
                        event_id:req.params.id
                    }
                })
                if(post !== 0){
                    res.send({success:true,message:"Event has been deleted"});
                }else{
                    res.send({success:false,message:"failed to delete Event"});
                }
            
            
            }else{
                res.send({success:false,message:"Password did not match"});
            }
           

        
        })

    }
   

}