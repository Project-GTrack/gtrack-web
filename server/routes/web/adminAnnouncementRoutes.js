const express = require("express");
const router = express.Router();
const announcementController = require("../../controllers/web/announcementController");

router.get("/view",announcementController.viewAnnouncements);
router.post("/create",announcementController.createAnnouncement);
router.put("/edit/:id",announcementController.editAnnouncement);
module.exports = router;