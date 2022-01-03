const {DataTypes} = require('sequelize');
const instance = require('../connection');


const dumpster = instance.sequelize.define("dumpsters",{
    dumpster_id:{
        type:DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull:  false,
    },
    admin_id:{
        type:DataTypes.BIGINT,
        allowNull: false
    },
    street:{
        type:DataTypes.STRING,
        allowNull: false
    },
    purok:{
        type:DataTypes.STRING,
        allowNull: false
    },
    barangay:{
        type:DataTypes.STRING,
        allowNull: false
    },
    town:{
        type:DataTypes.STRING,
        allowNull: false
    },
    postal_code:{
        type:DataTypes.STRING,
        allowNull: false
    },
    latitude:{
        type:DataTypes.STRING,
        allowNull: false
    },
    longitude:{
        type:DataTypes.STRING,
        allowNull: false
    },
    complete:{
        type:DataTypes.INTEGER,
        allowNull: false
    }
},{
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: "dumpsters"
}

);
exports.model = concern;