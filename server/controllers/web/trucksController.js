const {sequelize} = require("sequelize");
require('dotenv').config("../../.env");

const user=require("../../models/user");
const schedule=require("../../models/schedule");
const truck=require("../../models/truck");
const truck_assignment=require("../../models/truck_assignment");
const e = require("express");


//For testing purposes, generate accesstoken
const generateAccessToken = (user) =>{
    return jwt.sign({user_id: JSON.stringify(user)},process.env.ACCESS_TOKEN_SECRET)
}
// Start of Truck Model Controllers

function mockLogin(params) {
    
}


exports.addTruck = async(req, res) => {


    //Login for testing

    let accessToken = await user.model.findOne({
        where:{
            email:req.body.email,
            user_type:"Admin",
            status:true
        }
    })

    req.body.accessToken = generateAccessToken(accessToken);

    //end of login for testing

    if(req.body.accessToken){
        jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err, decoded) => {

            var admin = await user.model.findAll({
                where:{
                    user_id:decoded.user_id,
                    user_type:"Admin"
                }
            })

            var driver = await user.model.findAll({
                where:{
                    fname:req.body.driverName,
                    user_type:"Driver"
                }
            })
            if (admin && driver) {

                let truckExist = await truck.model.findAll({
                    where:{
                        plate_no:req.body.plate_no
                    }
                })
                if (truckExist.length === 0) {
                    let truck = await truck.model.create({
                        user_id:admin.user_id,
                        plate_no:req.body.plate_no,
                        model:req.body.model
                    })
                    if (truck) {

                        let truckAssignment = await truck_assignment.model.create({
                            truck_id: truck.truck_id,
                            driver_id: driver.user_id,
                        })
                        if (truckAssignment) {
                            return res.send("Truck Record and Assignment Successfully Created");
                        }
                    } else {
                        return res.send("something went wrong the truck record wasn't created");
                    }
                } else {
                    return res.send("Truck Record already exists");
                }
            } else {
                return res.send("Something Big went wrong you don't have admin rights");
            }
        }
    )}
}

exports.deleteTruck = async(req, res) => {

    let truck = await truck.model.destroy({
        where:{
            truck_id:req.body.id
        }
    })

    if (truck) {
        return res.send("Truck record successfully deleted");
    }else{
        return res.send("Something went wrong")
    }


}

exports.updateTruck = async(req, res) => {
    
    let truck = await truck.model.update(
        {
            plate_no: req.body.plate_no,
            model: req.body.model
        },{
            where:{
                truck_id: req.params.id
            }
        }
    )
    if (truck) {
        return res.send("Truck Record Successfully updated");
    } else {
        return res.send("Something went balistic");
    }
  
}

exports.deactivateTruck = async(req,res) => {  //move to maintenance
    let truck = await truck.model.update(
        {
            active:0
        },{
            where:{
                truck_id:req.params.id
            }
        }
    )
    if (truck) {
        return res.send("Truck has now been moved to UNDER MAINTENANCE");
    } else {
        return res.send("Something went wrong");
    }
}

exports.activateTruck = async(req,res) => {     //move to active trucks
    let truck = await truck.model.update(
        {
            active:1
        },{
            where:{
                truck_id:req.params.id
            }
        }
    )
    if (truck) {
        return res.send("Truck has now been moved to UNDER MAINTENANCE");
    } else {
        return res.send("Something went wrong");
    }
}

exports.displayTruck = async(req, res) => {         //specific truck record

}

exports.displayTrucks = async(req, res) => {

}

// End of Truck model controllers






//KABALO KO NAA NI WA KO KASABOT AHA DAPIT NA WALA AKONG THOUGHT PROCESS
// exports.something = async(req,res) => {
//     if(req.body.accessToken){
//         jwt.verify(req.body.accessToken,process.env.ACCESS_TOKEN_SECRET, async(err, decoded) => {
            

//             //Checks if the truck plate number isn't in the system to indicate that the truck is new
//             let truckExist = await truck.model.findAll({
//                 where:{
//                     plate_no:req.body.plate
//                 }
//             })

//             //If truck doesn't exist then we create the truck record
//             if (truckExist === 0) {
//                 let truck = await truck.model.create({
//                     plate_no:req.body.plate_no,
//                     model:req.body.model,
//                     //add the admin id to userid idk where to find it
//                 })
//                 //Check if create successful
//                 if (truck) {
//                     //check if driver is existing
//                     var driver = await user.model.findAll({
//                         where:{
//                             //need paba i check ang deleted at?
//                             user_type:"Driver"
//                         }
//                     })
//                     if (driver) {
//                         // we first check if driver is assigned to a truck
//                         let driverCheck = await truck_assignment.model.findAll({
//                             where:{
//                                 driver_id:driver.user_id
//                             }
//                         })
//                         if (driverCheck === 0) {
//                             let data = await truck_assignment.model.create({
//                                 driver_id:driver.user_id,
//                                 truck_id:truck.truck_id,
//                             })
//                             if (data) {
//                                 return res.send("")
//                             }
//                         } else {
//                             return res.send("Driver is already assigned to a Truck");
//                         }
//                     } else {
//                         // this can be changed by showing the list of available drivers as a drop down in the front end
//                         return res.send("Driver Record doesn't exist");
//                     }
//                 } else {
//                     return res.send("record creation failed, something went wrong");
//                 }   
//             } else {
//                 return res.send("Truck already exists");
//             }
//         })
//     }
// }



// exports.deleteUser = async(req,res) => {
//     let data = user.model.destroy({
//         where:{
//             user_id: req.params.id //Id of the user I wanna delete will be passed (this id should be stored in the delete button) 
//         }
//     }).then(function(rowDeleted){
//         if(rowDeleted===1){
//             res.send({value:data}); 
//             console.log('Record Deleted Successfully');
//         }
//     }, function(err){
//         console.log(err);
//     })
// }


// //Need to test this first
// exports.updateUser = async(req,res) => {
//     //add the needed data to do the updates
//     const updateObject = req.body
//     //Medj big bug ni siya kay if mag send ka part sa object og new password ma change siya so if naa password apil sa req 
//     //matic error
//     if (req.body.password) {
//         return res.status(500).send('something went wrong');
//     }

//     let data = await user.model.update(updateObject, {
//         where:{
//             user_id: req.params.id
//         }
//     })
    
//     if (data) {
//         res.send({value:data}); 
//         console.log('record has been updated');
//     }
// }