const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userController = require("../controllers/userController");


router.post("/register",userController.registerEmployee);
router.post("/login",userController.login);
router.post("/logout",userController.logout);

module.exports = router;