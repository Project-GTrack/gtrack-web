const { Sequelize } = require("sequelize");
require('dotenv').config("../../.env");
var C = require("crypto-js");
const report=require("../../models/report");
const attachment_line=require("../../models/attachment_line");
const attachment=require("../../models/attachment");


exports.submitReport = async (req, res) => {
    let attLine = await attachment_line.model.create();
    // let latest = attachment_line.model.findOne({
    //     order: [['attachment_line_id', 'DESC']]
    // })
    // console.log("GOOOOD",JSON.stringify(latest));
    if(attLine){
        for(var x = 0; x < req.body.image.length; x++){
            let img = await attachment.model.create({
                attachment_line_id:attLine.attachment_line_id,
                filename:req.body.image[x]
            });
        }
        let doc = await report.model.create({
            driver_id:req.params.id,
            attachment_line_id:attLine.attachment_line_id,
            subject:req.body.subject,
            message:req.body.message,
            latitude:req.body.latitude,
            longitude:req.body.longitude,
            degree:req.body.degree,
            status:1
        });
        res.send({success:true,message:"Report Submitted Successfully"});
    }
}
