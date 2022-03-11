const express=require('express');
const router=express.Router();
const accountController=require("../../controllers/mobile/accountController");

router.post("/register",accountController.register);
router.post("/login",accountController.login);
router.post("/verify_email",accountController.verifyEmail);
router.post("/reset_password",accountController.resetPassword);
module.exports=router;