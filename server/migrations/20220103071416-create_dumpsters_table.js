'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable("dumpsters",{
      dumpster_id:{
          type:Sequelize.BIGINT,
          autoIncrement: true,
          primaryKey: true,
          allowNull:false,
      },
      admin_id:{
          type:Sequelize.BIGINT,
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
      latitude:{
          type:Sequelize.STRING,
          allowNull:false
      },
      longitude:{
          type:Sequelize.STRING,
          allowNull:false
      },
      complete:{
          type:Sequelize.INTEGER,
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
     });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable("dumpsters");
  }
};
