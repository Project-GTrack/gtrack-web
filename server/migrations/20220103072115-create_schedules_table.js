'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("schedules",{
      schedule_id:{
          type:Sequelize.BIGINT,
          autoIncrement:true,
          primaryKey:true,
          allowNull:false,
      },
      admin_id:{
          type:Sequelize.BIGINT,
          allowNull:false
      },
      driver_id:{
          type:Sequelize.BIGINT,
          allowNull:false
      },
      assignment_id:{
          type:Sequelize.BIGINT,
          allowNull:false
      },
      schedule:{
          type:Sequelize.DATE,
          allowNull:false
      },
      garbage_type:{
          type:Sequelize.ENUM('biodegradable','non-biodegradable','recyclable'),
          allowNull:false
      },
      landmark:{
          type:Sequelize.STRING,
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
    await queryInterface.dropTable("schedules");
  }
};
