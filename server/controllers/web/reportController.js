const {sequelize} = require("sequelize");
require('dotenv').config("../../.env");
const jwt = require("jsonwebtoken");
const user=require("../../models/user");
const schedule=require("../../models/schedule");
var C = require("crypto-js");
const truck=require("../../models/truck");
const e = require("express");



