'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("users",{
      user_id:{
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement:true,
          allowNull:false
      },
      email:{
          type: Sequelize.STRING,
          allowNull:false
      },
      fname:{
          type: Sequelize.STRING,
          allowNull:false
      },
      lname:{
          type: Sequelize.STRING,
          allowNull:false
      },
      image:{
          type: Sequelize.STRING,
          allowNull:true
      },
      contact_no:{
          type: Sequelize.STRING,
          allowNull:true
      },
      birthday:{
          type: Sequelize.DATEONLY,
          allowNull:true
      },
      gender:{
          type: Sequelize.ENUM('Male','Female'),
          allowNull:true
      },
      email_verified_at:{
          type: Sequelize.DATE,
          allowNull:true
      },
      password:{
          type: Sequelize.STRING,
          allowNull:false
      },
      user_type:{
        type:Sequelize.ENUM('Admin','Driver','Resident'),
        allowNull:false
      },
      remember_token:{
          type: Sequelize.STRING,
          allowNull:true
      },
      google_auth:{
        type: Sequelize.BOOLEAN,
        allowNull:true
      },
      user_type:{
        type: Sequelize.ENUM('Resident','Driver','Admin'),
        allowNull:true
      },
      street:{
          type:Sequelize.STRING,
          allowNull:true
      },
      purok:{
          type:Sequelize.STRING,
          allowNull:true
      },
      barangay:{
          type:Sequelize.STRING,
          allowNull:true
      },
      town:{
          type:Sequelize.STRING,
          allowNull:true
      },
      postal_code:{
          type:Sequelize.STRING,
          allowNull:true
      },
      status:{
          type:Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: false
      },
      createdAt:{
        type:Sequelize.DATE,
        allowNull:false
      },
      updatedAt:{
        type:Sequelize.DATE,
      },
      deletedAt:{
        type:Sequelize.DATE,
      },

    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("users");
  }
};
