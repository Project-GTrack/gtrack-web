const express=require('express');
const router=express.Router();
const concernController=require("../../controllers/mobile/concernController");

router.post("/send",concernController.send);
module.exports=router;