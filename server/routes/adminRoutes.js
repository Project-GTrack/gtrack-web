const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userController = require("../controllers/userController");


router.post("/register",userController.registerUser);
router.post("/login",userController.login);
router.post("/logout",userController.logout);


//employee module routes
router.post('/deleteRecord',userController.deleteUser);

module.exports = router;