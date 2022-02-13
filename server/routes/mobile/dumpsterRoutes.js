const express=require('express');
const router=express.Router();
const dumpsterController=require("../../controllers/mobile/dumpsterController");

router.get("/get-dumpsters",dumpsterController.getDumpsters);
router.put("/update-dumpster/:id",dumpsterController.updateDumpsters);

module.exports=router;