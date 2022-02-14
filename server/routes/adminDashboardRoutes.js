const express = require("express");
const router = express.Router();
const auth = require("../auth");
const dashboardController = require("../controllers/dashboardController");

router.post("",dashboardController.viewDashboard);


module.exports = router;