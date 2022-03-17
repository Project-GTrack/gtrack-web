const express=require('express');
const router=express.Router();
const profileController=require("../../controllers/web/profileController");

router.post("/general_info",profileController.changeGeneral);
router.post("/address",profileController.changeAddress);
router.post("/change_password",profileController.changePassword);
router.post("/info",profileController.changeInfo);
router.post("/change_profile_photo",profileController.changeProfilePhotoOnly);
module.exports=router;