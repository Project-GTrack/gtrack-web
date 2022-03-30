const {sequelize} = require("sequelize");
require("dotenv").config("../../.env");
const jwt = require("jsonwebtoken");
var C = require("crypto-js");
const report = require("../../models/report");
const concern = require("../../models/concern");
const attachment_line = require("../../models/attachment_line");
const user = require("../../models/user");
const e = require("express");
const { NULL } = require("mysql/lib/protocol/constants/types");


report.model.belongsTo(user.model,{foreignKey:'driver_id', as: 'reportDriver'});
report.model.belongsTo(attachment_line.model,{foreignKey:'attachment_line_id', as:'reportAttachmentLine'});
concern.model.belongsTo(user.model,{foreignKey:'resident_id', as: 'concernResident'});
concern.model.belongsTo(attachment_line.model,{foreignKey:'attachment_line_id', as:'concernAttachmentLine'});


function checkPassword(accessToken){
    jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET,async(err,decoded)=>{
        var decodedData=JSON.parse(decoded.user_id);
        var bytes  = C.AES.decrypt(decodedData.password, process.env.SECRET_KEY);
        if (req.body.password !==  bytes.toString(C.enc.Utf8)) return false;
        return true;
    })
}

// exports.getReportsandConcerns = async(req,res) => {
//     //find all reports (both active and inactive with deletedat as NULL)
//     let reportsUnresolved = await report.model.findAll({
//         where:{
//             status:1,
//             deletedAt:null
//         },
//         include:[{
//             model: user.model, as:"reportDriver"
//         }]
//     });

//     let reportsResolved = await report.model.findAll({
//         where: {
//             status:0,
//             deletedAt:null
//         }, include: [{
//             model: user.model, as: "reportDriver"
//         }]
//     });

//     let concernsUnresolved = await concern.model.findAll({
//         where:{
//             status:1,
//             deletedAt: null
//         },
//         include:[{
//             model: user.model, as:"concernResident"
//         }]
//     });

//     let concernsResolved = await concern.model.findAll({
//         where:{
//             status:0,
//             deletedAt: null
//         },
//         include:[{
//             model: user.model, as:"concernResident"
//         }]
//     });

//     res.send({ success:true, data:{reportsResolved:reportsResolved, reportsUnresolved:reportsUnresolved, concernsUnresolved:concernsUnresolved, concernsResolved:concernsResolved }});
// }

//Resolve Report better utilizes the check password for efficient and reusable code 
//UPDATE: CheckPassword function does not work so update the code to a working one 

exports.getReports = async(req,res) => {
    let reportsUnresolved = await report.model.findAll({
        where:{
            status: 1,
            deletedAt:null,
        }, 
        include:[{
            model: user.model, as:"reportDriver"
        }] 
    });
    let concernsUnresolved = await concern.model.findAll({
        where:{
            status: 1,
            deletedAt:null,
        }, 
        include:[{
            model: user.model, as:"concernResident"
        }] 
    });
    let reportsResolved = await report.model.findAll({
        where:{
            status: 0,
            deletedAt:null,
        }, 
        include:[{
            model: user.model, as:"reportDriver"
        }] 
    });
    let concernsResolved = await concern.model.findAll({
        where:{
            status: 0,
            deletedAt:null,
        }, 
        include:[{
            model: user.model, as:"concernResident"
        }] 
    });
    res.send({ success:true, data:{reports:reportsUnresolved, concerns:concernsUnresolved, reportsResolved:reportsResolved, concernsResolved:concernsResolved }});
}


exports.resolveReport = async(req,res) => {
    if (req.body.accessToken) {
        jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err,decoded) => {
            var decodedData=JSON.parse(decoded.user_id);
            var bytes  = C.AES.decrypt(decodedData.password, process.env.SECRET_KEY);
            if (req.body.password === bytes.toString(C.enc.Utf8)) {
                let data = await report.model.update({
                        status:0
                    },{
                        where:{
                            report_id:req.params.id
                        }
                    }
                )
                if (data) {
                    res.send({success:true,message:"Report has been Resolved"});
                } else {
                    res.send({success:false,message:"Something went wrong"})
                }
            } else {
                res.send({success:false,message:"Password is incorrect"});
            }          
        })
    }
}



exports.viewReport = async(req,res) => {
    //look for report and return as data to the modal
    let reports = await report.model.findOne({
        where:{
            report_id:req.params.id
        }
    })
    if (reports){
        res.send({success:true, data:reports});
    } else {
        res.send({success:false, data:NULL});
    }
}

exports.deleteReport = async(req,res) => {
    //destroy report
    if (req.body.accessToken) {
        jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err,decoded) => {
            var decodedData=JSON.parse(decoded.user_id);
            var bytes  = C.AES.decrypt(decodedData.password, process.env.SECRET_KEY);
            if (req.body.password === bytes.toString(C.enc.Utf8)) {
                let reports = await report.model.destroy({
                        where:{
                            report_id:req.params.id
                        }
                    }
                )
                if (reports) {
                    res.send({success:true,message:"Report record has been deleted"});
                } else {
                    res.send({success:false,message:"Something went wrong"});
                }
            } else {
                res.send({success:false,message:"Password is incorrect"});
            }          
        })
    }
}


//concerns funciton

exports.resolveConcern = async(req,res) => {
    // change status to 0
    if(req.body.accessToken){
        jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err,decoded) => {
            var decodedData=JSON.parse(decoded.user_id);
            var bytes = C.AES.decrypt(decodedData.password, process.env.SECRET_KEY);
            if(req.body.password === bytes.toString(C.enc.Utf8)){
                let concerns = await concern.model.update({
                    status:0
                },{
                    where:{
                        concern_id:req.params.id
                    }
                })

                if (concerns) {
                    res.send({success:true, message:"Concern has been resolved"});
                } else {
                    res.send({success:false, message:"something went wrong"});
                }
            } else {
                res.send({success:false, message:"Password is incorrect!"});
            }
        })
    }
}

exports.viewConcern = async(req,res) => {
    //find 1 with concern_id and return data to modal
    let concerns = await concern.model.findOne({
        where:{
            concern_id:req.params.id
        }
    })
    if (concerns){
        res.send({success:true, data:concerns});
    } else {
        res.send({success:false, data:NULL});
    }

}

exports.deleteConcern = async(req,res) => {
    //destroy concern
    if (req.body.accessToken) {
        jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err,decoded) => {
            var decodedData=JSON.parse(decoded.user_id);
            var bytes  = C.AES.decrypt(decodedData.password, process.env.SECRET_KEY);
            if (req.body.password === bytes.toString(C.enc.Utf8)) {
                let concerns = await concern.model.destroy({
                        where:{
                            concern_id:req.params.id
                        }
                    }
                )
                if (concerns) {
                    res.send({success:true,message:"Concern record has been deleted"});
                } else {
                    res.send({success:false,message:"Something went wrong"});
                }
            } else {
                res.send({success:false,message:"Password is incorrect"});
            }          
        })
    }
}



//POSSIBLE BETTER FUNCTIONS

//This one probably doesn't work
exports.resolveReportBetter = async(req,res) => {
    if(!checkPassword(req.body.accessToken)) return res.send({success:false, message:"Invalid Password"});
    let data = await report.model.update(
        {
            active:0
        },{
            where:{
                report_id: req.params.id
            }
        }
    )
    if(!data) return res.send({success:false, message:"Something went wrong"});
    return res.send({success:true, message:"Report has been Resolved"});
}
//
//Same goes for this one
exports.resolveReportSemiBetter = async(req,res) => {
    //change status to 0
    jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err,decoded) => {
        var decodedData = JSON.parse(decoded.user_id);
        var bytes = C.AES.decrypt(decodedData.password, process.env.SECRET_KEY);
        if (req.body.password !==  bytes.toString(C.enc.Utf8)) return res.send({success:false, message:"Invalid Password"});
        let data = await report.model.update(
            {
                active:0
            },{
                where:{
                    report_id: req.params.id
                }
            }
        )
        if(!data) return res.send({success:false, message:"Something went wrong"});
        return res.send({success:true, message:"Report has been Resolved"});
    })        
}
//



