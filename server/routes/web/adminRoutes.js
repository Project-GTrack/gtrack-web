const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userController = require("../../controllers/web/userController");


// router.post("/register",userController.registerEmployee);
router.post("/login",userController.login);
router.post("/logout",userController.logout);


//employee module routes
router.get('/get/users',userController.display);
router.post('/deactivate',userController.deactivate);
router.post('/activate',userController.activate);
router.post('/register',userController.register);
router.post('/reset_password',userController.resetPassword);
router.post('/verify_email',userController.verifyEmail);
router.post('/forgot_password',userController.forgotPassword);
router.post('/reset_email',userController.resetEmail);
// router.post('/deleteUser/:id',userController.deleteUser);
// router.post('/updateUser/:id',userController.updateUser);

module.exports = router;