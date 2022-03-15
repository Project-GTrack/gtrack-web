const {DataTypes} = require('sequelize');
const instance = require('../connection');


const truck_assignment = instance.sequelize.define("truck_assignments",{
    assignment_id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    driver_id:{
        type: DataTypes.BIGINT,
        allowNull: false
    },
    truck_id:{
        type: DataTypes.BIGINT,
        allowNull: false
    }

},{
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: "truck_assignments"
}
);
exports.model = truck_assignment;