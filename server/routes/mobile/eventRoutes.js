const express=require('express');
const router=express.Router();
const eventController=require("../../controllers/mobile/eventController");

router.get("/get-events",eventController.getEvents);
router.post("/join-event/:id",eventController.joinEvent);

module.exports=router;