const {DataTypes} = require('sequelize');
const instance = require('../connection');


const truck = instance.sequelize.define("trucks",{
    truck_id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_id:{
        type: DataTypes.BIGINT,
        allowNull: false
    },
    plate_no:{
        type: DataTypes.STRING,
        allowNull: false
    },
    model:{
        type: DataTypes.STRING,
        allowNull: false
    },
    active:{
        type: DataTypes.TINYINT,
        allowNull: false
    }

},{
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: "trucks"
}
);
exports.model = truck;