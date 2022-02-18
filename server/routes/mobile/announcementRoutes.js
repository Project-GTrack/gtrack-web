const express=require('express');
const router=express.Router();
const accountController=require("../../controllers/mobile/announcementController");

router.get("/get-announcements",accountController.getAnnouncements);

module.exports=router;