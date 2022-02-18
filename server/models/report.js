const {DataTypes} = require('sequelize');
const instance = require('../connection');


const report = instance.sequelize.define("reports",{
    report_id:{
        type:DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull:  false,
    },
    driver_id:{
        type:DataTypes.BIGINT,
        allowNull: false
    },
    attachment_line_id:{
        type:DataTypes.BIGINT,
        allowNull: false
    },
    subject:{
        type:DataTypes.STRING,
        allowNull: false
    },
    message:{
        type:DataTypes.TEXT,
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
    degree:{
        type:DataTypes.STRING,
        allowNull: false
    },
    status:{
        type:DataTypes.TINYINT,
        allowNull: false
    }
},{
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: "reports"
}

);
exports.model = report;