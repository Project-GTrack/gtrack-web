const {sequelize} = require("sequelize");
require('dotenv').config("../../.env");

const user=require("../../models/user");
const schedule=require("../../models/schedule");
const truck=require("../../models/truck");
const truck_assignment=require("../../models/truck_assignment");
const e = require("express");





exports.addTruck = async(req,res) => {
    if(req.body.accessToken){
        jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err, decoded) => {
            
            
            //Checks if the truck plate number isn't in the system to indicate that the truck is new
            let truckExist = await truck.model.findAll({
                where:{
                    plate_no:req.body.plate
                }
            })

            //If truck doesn't exist then we create the truck record
            if (truckExist === 0) {
                let data = await truck.model.create({
                    plate_no:req.body.plate_no,
                    model:req.body.model,
                    //add the admin id to userid idk where to find it
                })
                //Check if create successful
                if (data) {
                    var driver = await user.model.findAll({
                        where:{
                            //need paba i check ang deleted at?
                            user_type:Driver
                        }
                    })
                    let new_data = await truck_assignment.model.create({

                    })
                }


                
            } else {
                return res.send("Truck already exists")
            }
        


        })





    }

}