const { Sequelize, Op } = require("sequelize");
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
const moment = require('moment');
const { sequelize } = require("../../connection");


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
            status: "Ongoing",
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
    // let posts2 = await sequelize.query("SELECT e.* FROM events e INNER JOIN users u ON e.admin_id = u.user_id INNER JOIN attachment_lines a ON e.attachment_line_id = a.attachment_line_id INNER JOIN attachments at ON a.attachment_line_id = at.attachment_line_id WHERE e.status = 'Ongoing' AND e.startDate < CURRENT_DATE()");
    // console.log(posts2);
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

// exports.getEvents=async (req,res)=>{
//     let posts=await event.model.findAll({
//         order:[['createdAt','DESC']],
//         where:{
//             status: "Ongoing",
//             startDate:{
//                 [Op.gt]: moment().format('YYYY-MM-DD')
//             }
//         },
//         include:[{
//             model: user.model, as:"eventAdmin"
//         },{
//             model: attLine.model, as:"eventLine",
//             include:[{
//                 model: attachment.model, as:"lineAttachment" //lineAttachment
//             }]
//         }]
//     });
//     // let posts2 = await sequelize.query("SELECT e.* FROM events e INNER JOIN users u ON e.admin_id = u.user_id INNER JOIN attachment_lines a ON e.attachment_line_id = a.attachment_line_id INNER JOIN attachments at ON a.attachment_line_id = at.attachment_line_id WHERE e.status = 'Ongoing' AND e.startDate < CURRENT_DATE()");
//     // console.log(posts2);
//     if(posts!==null){
//         res.send({success:true,data:posts});
//     }else{
//         res.send({success:false,data:null});
//     }
// }



// Post.findAll({
//   where: {
//     [Op.and]: [{ a: 5 }, { b: 6 }],            // (a = 5) AND (b = 6)
//     [Op.or]: [{ a: 5 }, { b: 6 }],             // (a = 5) OR (b = 6)
//     someAttribute: {
//       // Basics
//       [Op.eq]: 3,                              // = 3
//       [Op.ne]: 20,                             // != 20
//       [Op.is]: null,                           // IS NULL
//       [Op.not]: true,                          // IS NOT TRUE
//       [Op.or]: [5, 6],                         // (someAttribute = 5) OR (someAttribute = 6)

//       // Using dialect specific column identifiers (PG in the following example):
//       [Op.col]: 'user.organization_id',        // = "user"."organization_id"

//       // Number comparisons
//       [Op.gt]: 6,                              // > 6
//       [Op.gte]: 6,                             // >= 6
//       [Op.lt]: 10,                             // < 10
//       [Op.lte]: 10,                            // <= 10
//       [Op.between]: [6, 10],                   // BETWEEN 6 AND 10
//       [Op.notBetween]: [11, 15],               // NOT BETWEEN 11 AND 15

//       // Other operators

//       [Op.all]: sequelize.literal('SELECT 1'), // > ALL (SELECT 1)

//       [Op.in]: [1, 2],                         // IN [1, 2]
//       [Op.notIn]: [1, 2],                      // NOT IN [1, 2]

//       [Op.like]: '%hat',                       // LIKE '%hat'
//       [Op.notLike]: '%hat',                    // NOT LIKE '%hat'
//       [Op.startsWith]: 'hat',                  // LIKE 'hat%'
//       [Op.endsWith]: 'hat',                    // LIKE '%hat'
//       [Op.substring]: 'hat',                   // LIKE '%hat%'
//       [Op.iLike]: '%hat',                      // ILIKE '%hat' (case insensitive) (PG only)
//       [Op.notILike]: '%hat',                   // NOT ILIKE '%hat'  (PG only)
//       [Op.regexp]: '^[h|a|t]',                 // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
//       [Op.notRegexp]: '^[h|a|t]',              // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
//       [Op.iRegexp]: '^[h|a|t]',                // ~* '^[h|a|t]' (PG only)
//       [Op.notIRegexp]: '^[h|a|t]',             // !~* '^[h|a|t]' (PG only)

//       [Op.any]: [2, 3],                        // ANY (ARRAY[2, 3]::INTEGER[]) (PG only)
//       [Op.match]: Sequelize.fn('to_tsquery', 'fat & rat') // match text search for strings 'fat' and 'rat' (PG only)
//     }
//   }
