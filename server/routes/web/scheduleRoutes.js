const express=require('express');
const router=express.Router();
const scheduleController=require("../../controllers/web/scheduleController");

router.get("/display",scheduleController.display);
router.get("/get_drivers_assignments",scheduleController.getDriversAssignments);
router.post("/add",scheduleController.addSchedule);
module.exports=router;