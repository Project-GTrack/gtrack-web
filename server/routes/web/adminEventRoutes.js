const express = require("express");
const router = express.Router();
const eventController = require("../../controllers/web/eventController");

router.get("/view",eventController.viewEvents);
router.post("/create",eventController.createEvent);
router.put("/edit/:id",eventController.editEvent);
router.post("/delete/:id",eventController.deleteEventNew);
module.exports = router;