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
          allowNull:false
      },
      contact_no:{
          type: Sequelize.STRING,
          allowNull:false
      },
      birthday:{
          type: Sequelize.DATEONLY,
          allowNull:false
      },
      gender:{
          type: Sequelize.ENUM('Male','Female'),
          allowNull:false
      },
      email_verified_at:{
          type: Sequelize.TIME,
          allowNull:false
      },
      password:{
          type: Sequelize.STRING,
          allowNull:false
      },
      remember_token:{
          type: Sequelize.STRING,
          allowNull:false
      },
      street:{
          type:Sequelize.STRING,
          allowNull:false
      },
      purok:{
          type:Sequelize.STRING,
          allowNull:false
      },
      barangay:{
          type:Sequelize.STRING,
          allowNull:false
      },
      town:{
          type:Sequelize.STRING,
          allowNull:false
      },
      postal_code:{
          type:Sequelize.STRING,
          allowNull:false
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
