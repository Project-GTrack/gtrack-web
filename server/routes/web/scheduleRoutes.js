const express=require('express');
const router=express.Router();
const scheduleController=require("../../controllers/web/scheduleController");

// router.get("/display",scheduleController.display);
router.get("/get_drivers_assignments",scheduleController.getDriversAssignments);
router.post("/add",scheduleController.addSchedule);
router.get("/get_schedules",scheduleController.getScheduleTruckAssignment);
router.post("/update/:id",scheduleController.updateSchedule);
router.post("/delete/:id",scheduleController.deleteScheduleNew);
module.exports=router;