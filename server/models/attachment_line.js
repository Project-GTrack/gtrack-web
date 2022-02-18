const {DataTypes} = require('sequelize');
const instance = require('../connection');


const attachment_line = instance.sequelize.define("attachment_lines",{
    attachment_line_id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
},{
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: "attachment_lines"
}
);
exports.model = attachment_line;