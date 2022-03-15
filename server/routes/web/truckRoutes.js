const express = require("express");
const router=express.Router();
const truckController = require("../../controllers/web/trucksController");



router.get("/get", truckController.getTrucks);

router.post("/add", truckController.addTruck);
router.post("/disable/:id", truckController.deactivateTruck);
router.post("/update/:id", truckController.updateTruck);
router.post("/reactivate/:id", truckController.activateTruck);







module.exports=router;