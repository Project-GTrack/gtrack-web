const express=require('express');
const router=express.Router();
const scheduleController=require("../../controllers/web/scheduleController");

router.get("/display",scheduleController.display);
module.exports=router;