const {DataTypes} = require('sequelize');
const instance = require('../connection');


const concern = instance.sequelize.define("concerns",{
    concern_id:{
        type:DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull:  false,
    },
    resident_id:{
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
    status:{
        type:DataTypes.TINYINT,
        allowNull: false
    },
    classification:{
        type:DataTypes.STRING,
        allowNull: false
    }
},{
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: "concerns"
}

);
exports.model = concern;