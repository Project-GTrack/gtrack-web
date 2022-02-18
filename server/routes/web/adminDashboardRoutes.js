const express = require("express");
const router = express.Router();
const dashboardController = require("../../controllers/web/dashboardController");

router.post("",dashboardController.viewDashboard);


module.exports = router;