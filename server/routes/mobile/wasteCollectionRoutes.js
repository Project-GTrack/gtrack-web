const express=require('express');
const router=express.Router();
const wasteCollectionController=require("../../controllers/mobile/wasteCollectionController");

router.post("/submit-collection/:id",wasteCollectionController.submitCollection);

module.exports=router;