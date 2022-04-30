const { Sequelize } = require("sequelize");
require('dotenv').config("../../.env");
const dumpster=require("../../models/dumpster");
const user=require("../../models/user");

exports.getDumpsters=async (req,res)=>{
    let dumps=await dumpster.model.findAll({
        where:{
            deletedAt:null
        },
        include:[{
            model: user.model, as: 'dumpsterAdmin'
        }]
    });
    if(dumps!==null){
        res.send({success:true,data:dumps});
    }else{
        res.send({success:false,data:null});
    }
}
exports.updateDumpsters=async (req,res)=>{
    var status = 0;
    let dumpData=await dumpster.model.findOne({
        where:{
            dumpster_id:req.params.id
        }
    });
    if(dumpData.complete === 0){
        status = 1;
    }
    let dumps=await dumpster.model.update({complete:status},{
        where:{
            dumpster_id:req.params.id
        },
    });
        res.send({success:true,data:status});
}
