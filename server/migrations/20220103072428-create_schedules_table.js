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
          type:Sequelize.TEXT,
          allowNull:false
      },
      garbage_type:{
          type:Sequelize.ENUM('Biodegradable','Non-biodegradable','Recyclable'),
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
    }).then(() => queryInterface.addConstraint('schedules',{
      fields:['admin_id'],
      type: 'FOREIGN KEY',
      name: 'FK_schedules_1', // useful if using queryInterface.removeConstraint
      references: {
        table: 'users',
        field: 'user_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })).then(() => queryInterface.addConstraint('schedules',{
      fields:['driver_id'],
      type: 'FOREIGN KEY',
      name: 'FK_schedules_2', // useful if using queryInterface.removeConstraint
      references: {
        table: 'users',
        field: 'user_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })).then(() => queryInterface.addConstraint('schedules',{
      fields:['assignment_id'],
      type: 'FOREIGN KEY',
      name: 'FK_schedules_3', // useful if using queryInterface.removeConstraint
      references: {
        table: 'truck_assignments',
        field: 'assignment_id',
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
    await queryInterface.dropTable("schedules");
  }
};
