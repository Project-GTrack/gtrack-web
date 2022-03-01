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
                let event = await event.model.create({
                    admin_id : JSON.parse(decoded.user_id).user_id,
                    event_name : req.body.event_name,
                    description : req.body.description,
                    participants : req.body.participants,
                    startDate : req.body.startDate,
                    endDate : req.body.endDate,
                    street : req.body.street,
                    barangay : req.body.barangay,
                    town : req.body.town,
                    postal_code : req.body.postal_code,
                    attachment_line_id:attline.attachment_line_id
                })
            }
        })
    }

}