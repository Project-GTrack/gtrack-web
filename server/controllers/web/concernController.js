const { Sequelize } = require("sequelize");
require('dotenv').config("../../.env");
const user=require("../../models/user");
const concern=require("../../models/concern");
const attachment_line=require("../../models/attachment_line");
const attachment=require("../../models/attachment");
var moment = require('moment');

exports.send=async (req,res)=>{
    let account=await user.model.findOne({ where: { email: req.body.email } });
    let attLine=await attachment_line.model.create();
    if(attLine){
        const images=req.body.images;
        images.forEach(function(file){ 
            let att=attachment.model.create({attachment_line_id:attLine.attachment_line_id,filename:file});
        });
        let concernData=await concern.model.create({resident_id:account.user_id,attachment_line_id:attLine.attachment_line_id,subject:req.body.subject,message:req.body.message,status:false,classification:req.body.classification});
        if(concernData){
            res.send({success:true,message:"Concern sent successfully!",data:concernData});
        }else{
            res.send({success:false,message:"Concern not sent.",data:null});
        }
    }else{
        res.send({success:false,message:"Attachment not created.",data:null});
    }
}