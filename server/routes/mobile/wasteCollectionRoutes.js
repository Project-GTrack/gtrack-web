const express=require('express');
const router=express.Router();
const wasteCollectionController=require("../../controllers/mobile/wasteCollectionController");

router.post("/submit-collection/:id",wasteCollectionController.submitCollection);
// router.get("/get-route/:id",wasteCollectionController.getRoutes);
module.exports=router;