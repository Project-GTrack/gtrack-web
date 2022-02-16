'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable("event_participants",{
      event_participant_id:{
          type:Sequelize.BIGINT,
          autoIncrement: true,
          primaryKey: true,
          allowNull:false,
      },
      event_id:{
          type:Sequelize.BIGINT,
          allowNull:false
      },
      user_id:{
          type:Sequelize.BIGINT,
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

    }).then(() => queryInterface.addConstraint('event_participants',{
      fields:['user_id'],
      type: 'FOREIGN KEY',
      name: 'FK_event_participants_1', // useful if using queryInterface.removeConstraint
      references: {
        table: 'users',
        field: 'user_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })).then(() => queryInterface.addConstraint('event_participants',{
      fields:['event_id'],
      type: 'FOREIGN KEY',
      name: 'FK_event_participants_2', // useful if using queryInterface.removeConstraint
      references: {
        table: 'events',
        field: 'event_id',
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
     await queryInterface.dropTable("event_participants");
  }
};
