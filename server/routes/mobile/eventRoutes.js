const express=require('express');
const router=express.Router();
const eventController=require("../../controllers/mobile/eventController");

router.get("/get-events",eventController.getEvents);

module.exports=router;