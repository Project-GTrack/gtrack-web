'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("truck_assignments",{
      assignment_id:{
          type: Sequelize.BIGINT,
          primaryKey:true,
          autoIncrement:true,
          allowNull:false
      },
      driver_id:{
          type: Sequelize.BIGINT,
          allowNull:false
      },
      truck_id:{
          type: Sequelize.BIGINT,
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
    await queryInterface.dropTable("truck_assignments");
  }
};
