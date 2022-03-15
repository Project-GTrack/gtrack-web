const { Sequelize } = require("sequelize");
require('dotenv').config("../../.env");
var C = require("crypto-js");
const event=require("../../models/event");
const announcement=require("../../models/announcement");
const user=require("../../models/user");
const attLine=require("../../models/attachment_line");
const attachment=require("../../models/attachment");
const report=require("../../models/report");
const schedule=require("../../models/schedule");
const truck=require("../../models/truck");
const truck_assignment=require("../../models/truck_assignment");
const dumpster=require("../../models/dumpster");


user.model.hasMany(event.model, {foreignKey: 'admin_id', as: 'adminEvent'});
event.model.belongsTo(user.model, {foreignKey: 'admin_id', as: 'eventAdmin'});
event.model.hasOne(attLine.model, {foreignKey: 'attachment_line_id', sourceKey: 'attachment_line_id', as: 'eventLine'});
attLine.model.hasOne(event.model, {foreignKey: 'attachment_line_id', sourceKey: 'attachment_line_id', as: 'lineEvent'});
user.model.hasMany(announcement.model, {foreignKey: 'admin_id', as: 'adminAnnouncement'});
announcement.model.belongsTo(user.model, {foreignKey: 'admin_id', as: 'announcementAdmin'});
announcement.model.hasOne(attLine.model, {foreignKey: 'attachment_line_id', sourceKey: 'attachment_line_id', as: 'announcementLine'});
attLine.model.hasOne(announcement.model, {foreignKey: 'attachment_line_id', sourceKey: 'attachment_line_id', as: 'lineAnnouncement'});
attLine.model.hasMany(attachment.model, {foreignKey: 'attachment_line_id', sourceKey: 'attachment_line_id',as:'lineAttachment'});
attachment.model.belongsTo(attLine.model, {foreignKey: 'attachment_line_id', sourceKey: 'attachment_line_id', as: 'attachementLine'});
// eventParticipant.model.hasOne(event.model, {foreignKey: 'event_id', as: 'partiEvent'});
// event.model.hasMany(eventParticipant.model, {foreignKey: 'event_id', as: 'eventParti'});
// eventParticipant.model.hasOne(user.model, {foreignKey: 'user_id', as: 'partiUser'});
// user.model.hasMany(eventParticipant.model, {foreignKey: 'user_id', as: 'userPari'});
report.model.hasOne(attLine.model, {foreignKey: 'attachment_line_id', as: 'reportLine'});
attLine.model.hasOne(report.model, {foreignKey: 'attachment_line_id', as: 'lineReport'});
dumpster.model.belongsTo(user.model, {foreignKey:'admin_id', as: 'dumpsterAdmin'});
user.model.hasMany(dumpster.model, {foreignKey:'admin_id', as: 'adminDumpster'});
user.model.hasMany(schedule.model, {foreignKey: 'driver_id', as: 'userSchedule'});

exports.getEvents=async (req,res)=>{
    let posts=await event.model.findAll({
        order:[['createdAt','DESC']],
        where:{
            deletedAt:null
        },
        include:[{
            model: user.model, as:"eventAdmin"
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

// exports.joinEvent = async (req, res) => {
//     let account=await user.model.findOne({ where: { email: req.body.email } });
//     if(account){
//         var decrypted = C.AES.decrypt(account.password,process.env.SECRET_KEY);
//         if(req.body.password===decrypted.toString(C.enc.Utf8)){
//             let events=eventParticipant.model.create({
//                 event_id:req.params.id,
//                 user_id:account.user_id
//             })
//             res.send({success:true,message:"You have successfully joined the event!"});
//         }else{
//             res.send({success:false,message:"Password is invalid!"});
//         }
//     }
// }
