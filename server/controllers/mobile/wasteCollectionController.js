const { Sequelize } = require("sequelize");
require('dotenv').config("../../.env");
var C = require("crypto-js");
const waste_collection=require("../../models/waste_collection");


exports.submitCollection = async (req, res) => {
    let waste=waste_collection.model.create({
        driver_id:req.params.id,
        collection_weight_volume:req.body.collection_weight_volume,
        collection_date:req.body.collection_date,
        collection_route:req.body.collection_route
    })
   res.send({success:true,message:"Submitted Successfully"});
}
