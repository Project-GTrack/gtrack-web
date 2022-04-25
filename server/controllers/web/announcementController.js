const { Sequelize } = require("sequelize");
require('dotenv').config("../../.env");
const announcement=require("../../models/announcement");
const attachment_line=require("../../models/attachment_line");
const attachment=require("../../models/attachment");
const admin=require("../../models/user");
const jwt=require("jsonwebtoken");
var C = require("crypto-js");
const Firebase = require('../../helpers/firebase');
const { Expo } = require('expo-server-sdk');

const database=Firebase.database();
let expo = new Expo();
exports.viewAnnouncements = async(req, res) => {
    let announcements=await announcement.model.findAll({
        order: [['createdAt','DESC']],
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
    res.send({ posts:announcements});
}
const handleFirebase=async (title)=>{
    var temp=[];
    var snap;
    const tokenRef=database.ref(`PushTokens/`);
    const snapshot=await tokenRef.once('value');
    if(snapshot.val()){
        snap=snapshot.val();
        temp=Object.keys(snap).map((key) => snap[key]);
    }
    if(temp.length>0){
        handlePushNotifications(temp,title);
    }else{
        console.log("No Pushtokens");
    }
}
const handlePushNotifications=(expoTokens,title)=>{
    let messages = [];
    for (let pushToken of expoTokens) {
      if (!Expo.isExpoPushToken(pushToken.push_token)) {
        console.error(`Push token ${pushToken.push_token} is not a valid Expo push token`);
        continue;
      }
      messages.push({
        to: pushToken.push_token,
        sound: 'default',
        title: "GTRACK Notice",
        body:title,
        data: {},
      })
    }
    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    (async () => {
      for (let chunk of chunks) {
        try {
          let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          tickets.push(...ticketChunk);
        } catch (error) {
          console.error(error);
        }
      }
    })();
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
                if(req.body.isNotified){
                   handleFirebase(req.body.title);
                }
                if(post){
                    res.send({success:true,message:"Announcement successfully Created!"});
                }else{
                    res.send({success:false,message:"Failed to create announcement."});
                }
            }else{
                    res.send({success:false,message:"Attachment not created."});
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
    let post = await announcement.model.update({
        title:req.body.title,
        content:req.body.content,
    },{
        where:{
            announcement_id: req.params.id
        }
    })

    if(post){
        res.send({success:true,message:"Announcement successfully Updated!"});
    }else{
        res.send({success:false,message:"Failed to update announcement."});
    }
 
   
}
exports.deleteAnnouncement = async(req, res) => {
    if(req.body.accessToken!= undefined){
        jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
            var bytes  = C.AES.decrypt(JSON.parse(decoded.user_id).password, process.env.SECRET_KEY);
            var originalText = bytes.toString(C.enc.Utf8);
            if(originalText === req.body.password){
                let announce = await announcement.model.findOne({
                    where:{
                        announcement_id: req.params.id
                    }
                })

                await attachment.model.destroy({
                    where:{
                        attachment_line_id : announce.attachment_line_id
                    }
                });
                await attachment_line.model.destroy({
                    where:{
                        attachment_line_id : announce.attachment_line_id
                    }
                })

                announce = await announcement.model.destroy({
                    where:{
                        announcement_id:req.params.id
                    }
                })
                if(announce !== 0){
                    res.send({success:true,message:"Announcement successfully Deleted"});
                }else{
                    res.send({success:false,message:"Failed to delete Announcement"});
                }
                
            }else{
                res.send({success:false,message:"Password did not match"});
            }
        })
        
    }
}