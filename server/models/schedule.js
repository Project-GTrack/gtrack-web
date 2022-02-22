const {DataTypes} = require('sequelize');
const instance = require('../connection');


const schedule = instance.sequelize.define("schedules",{
    schedule_id:{
        type:DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull:  false,
    },
    admin_id:{
        type:DataTypes.BIGINT,
        allowNull: false
    },
    driver_id:{
        type:DataTypes.BIGINT,
        allowNull: false
    },
    assignment_id:{
        type:DataTypes.BIGINT,
        allowNull: false
    },
    schedule:{
        type:DataTypes.TEXT,
        allowNull: false
    },
    garbage_type:{
        type:DataTypes.ENUM('Biodegradable','Non-biodegradable','Residual'),
        allowNull: false
    },
    landmark:{
        type:DataTypes.STRING,
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
    }
 
},{
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: "schedules"
}

);
exports.model = schedule;