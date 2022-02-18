const {DataTypes} = require('sequelize');
const instance = require('../connection');


const waste_collection = instance.sequelize.define("waste_collections",{
    weight_id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    driver_id:{
        type: DataTypes.BIGINT,
        allowNull: false
    },
    collection_weight_volume:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    collection_date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    collection_route:{
        type:DataTypes.STRING,
        allowNull:false
    }

},{
    createdAt: true,
    updatedAt: true,
    tableName: "waste_collections"
}
);
exports.model = waste_collection;