const express = require("express");
const router = express.Router();
<<<<<<< HEAD
=======
const auth = require("../../auth");
>>>>>>> 37c68f090018df9043002c4c714bbdbb82b771f5
const dashboardController = require("../../controllers/web/dashboardController");

router.post("",dashboardController.viewDashboard);


module.exports = router;