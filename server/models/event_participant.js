const {DataTypes} = require('sequelize');
const instance = require('../connection');


const event = instance.sequelize.define("event_participants",{
    event_participant_id:{
        type:DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false,
    },
    event_id:{
        type:DataTypes.BIGINT,
        allowNull:false
    },
    user_id:{
        type:DataTypes.BIGINT,
        allowNull:false
    }
   
},{
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: "event_participants"
}

);
exports.model = event;