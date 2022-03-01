const express = require("express");
const router = express.Router();
const eventController = require("../../controllers/web/eventController");

router.get("/view",eventController.viewEvents);

module.exports = router;