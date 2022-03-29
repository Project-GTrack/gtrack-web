const express = require("express");
const router=express.Router();
const reportController = require("../../controllers/web/reportController");




router.get("/get", reportController.getReports);

//report routes
router.post("/resolveReport/:id", reportController.resolveReport);
router.post("/deleteReport/:id", reportController.deleteReport);
router.get("/viewReport/:id", reportController.viewReport);

//Concerns routes
router.post("/resolveConcern/:id", reportController.resolveConcern);
router.post("/deleteConcern/:id", reportController.deleteConcern);
router.get("/viewConcern/:id", reportController.viewConcern);


module.exports=router;


