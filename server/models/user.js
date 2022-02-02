const {DataTypes} = require('sequelize');
const instance = require('../connection');


const user = instance.sequelize.define("users",{
    user_id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    fname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false
    },
    contact_no:{
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    gender:{
        type: DataTypes.ENUM('Male','Female'),
        allowNull: false
    },
    email_verified_at:{
        type: DataTypes.TIME,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    user_type:{
        type:DataTypes.ENUM('Admin','Driver','Resident'),
        allowNull:false
    },
    remember_token:{
        type: DataTypes.STRING,
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
    tableName: "users"
}
);
exports.model = user;