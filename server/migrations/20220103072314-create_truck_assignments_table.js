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
    }).then(() => queryInterface.addConstraint('truck_assignments',{
      fields:['driver_id'],
      type: 'FOREIGN KEY',
      name: 'FK_truck_assignments_1', // useful if using queryInterface.removeConstraint
      references: {
        table: 'users',
        field: 'user_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })).then(() => queryInterface.addConstraint('truck_assignments',{
      fields:['truck_id'],
      type: 'FOREIGN KEY',
      name: 'FK_truck_assignments_2', // useful if using queryInterface.removeConstraint
      references: {
        table: 'trucks',
        field: 'truck_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }))
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
