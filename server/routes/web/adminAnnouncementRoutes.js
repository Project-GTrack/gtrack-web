const express = require("express");
const router = express.Router();
const announcementController = require("../../controllers/web/announcementController");

router.post("/view",announcementController.viewAnnouncements);


module.exports = router;