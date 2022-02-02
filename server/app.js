require('dotenv').config();
const express=require('express');
var cors = require('cors')
var bodyParser = require('body-parser');

const app=express();
app.use(express());
app.use(cors())
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

app.listen(8000);

//INCLUDE MODULES HERE
const accountRoutes=require('./routes/mobile/accountRoutes');
const announcementRoutes=require('./routes/mobile/announcementRoutes');
const eventRoutes=require('./routes/mobile/eventRoutes');

//MOBILE ROUTES HERE
app.use("/mobile",accountRoutes);
app.use("/mobile/announcement",announcementRoutes);
app.use("/mobile/event",eventRoutes);
//WEB ROUTES HERE
