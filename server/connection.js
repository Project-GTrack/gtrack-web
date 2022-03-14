const {Sequelize} = require("sequelize");
require('dotenv').config("./.env");
const sequelize = new Sequelize(process.env.DATABASE,process.env.USERNAME,process.env.PASSWORD,{
    host:process.env.HOST,
    dialect:process.env.DIALECT,
    pool:{
        max:10,
        min:0,
        acquire:30000,
        idle:10000
    },
    define:{
        paranoid:true
    }
});
try{
    sequelize.authenticate();
}catch(err){
    console.log(err);
}
exports.sequelize=sequelize;