const express=require('express');
const router=express.Router();
const reportController=require("../../controllers/mobile/reportController");

router.post("/submit-report/:id",reportController.submitReport);

module.exports=router;