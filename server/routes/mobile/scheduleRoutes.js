const express=require('express');
const router=express.Router();
const scheduleController=require("../../controllers/mobile/scheduleController");

router.get("/display",scheduleController.display);
module.exports=router;