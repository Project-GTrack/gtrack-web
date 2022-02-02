const express = require('express')

const cors = require('cors');
const cookie   = require("cookie-parser");
// const bodyParser = require("body-parser");
const adminRoutes = require("./routes/adminRoutes");
const cookieParser = require('cookie-parser');
const app = express()


// app.use(bodyParser.urlencoded({extended:true}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials:true
}));
app.use(express.json());

app.use("/admin", adminRoutes);

app.listen(4000 , ()=>console.log("Backend is running"));