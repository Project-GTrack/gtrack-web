const {DataTypes} = require('sequelize');
const instance = require('../connection');


const announcement = instance.sequelize.define("announcements",{
    announcement_id:{
        type:DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull:  false,
    },
    admin_id:{
        type:DataTypes.BIGINT,
        allowNull: false
    },
    attachment_line_id:{
        type:DataTypes.BIGINT,
        allowNull: false
    },
    title:{
        type:DataTypes.STRING,
        allowNull: false
    },
    content:{
        type:DataTypes.TEXT,
        allowNull: false
    }
},{
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: "announcements"
}

);
exports.model = announcement;