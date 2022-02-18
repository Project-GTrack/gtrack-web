const {DataTypes} = require('sequelize');
const instance = require('../connection');


const attachment = instance.sequelize.define("attachments",{
    attachment_id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    attachment_line_id:{
        type: DataTypes.BIGINT,
        allowNull: false
    },
    filename:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    createdAt: true,
    updatedAt: true,
    tableName: "attachments"
}
);
exports.model = attachment;