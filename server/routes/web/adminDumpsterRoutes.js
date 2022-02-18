const express = require("express");
const router = express.Router();
const auth = require("../../auth");
const dumpsterController = require("../../controllers/web/dumpsterController");

router.get("/get-dumpsters",dumpsterController.getDumpsters);
router.get("/get-dumpster/:id",dumpsterController.getDumpster);
router.post("/add-dumpster",dumpsterController.addDumpster);
router.put("/edit-dumpster/:id",dumpsterController.editDumpster);
router.post("/delete-dumpster/:id",dumpsterController.deleteDumpster);
module.exports = router;