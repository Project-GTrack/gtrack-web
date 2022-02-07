const express=require('express');
const router=express.Router();
const profileController=require("../../controllers/mobile/profileController");

router.post("/general_info",profileController.updateGeneralInfo);
router.post("/address",profileController.address);
router.post("/change_password",profileController.change_password);
module.exports=router;