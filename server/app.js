require('dotenv').config();
const express=require('express');
var cors = require('cors')
var bodyParser = require('body-parser');

const adminRoutes = require("./routes/adminRoutes");
const cookieParser = require('cookie-parser');
const app = express()




app.use("/admin", adminRoutes);





app.use(express());
app.use(cors())
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.listen(8000,()=> console.log("Back end is running at port 8000"));

//INCLUDE MODULES HERE
const accountRoutes=require('./routes/mobile/accountRoutes');
const announcementRoutes=require('./routes/mobile/announcementRoutes');

//MOBILE ROUTES HERE
app.use("/mobile",accountRoutes);
app.use("/mobile/announcement",announcementRoutes);
//WEB ROUTES HERE
