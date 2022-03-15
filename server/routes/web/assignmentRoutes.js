const express = require("express");
const router = express.Router();
const auth = require("../../auth");
const assignmentController = require("../../controllers/web/assignmentController");

router.post("/add-assignment",assignmentController.addAssignment);
router.put("/edit-assignment/:id",assignmentController.editAssignment);
router.post("/delete-assignment/:id",assignmentController.deleteAssignment);
module.exports = router;