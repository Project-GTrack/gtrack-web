'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      await queryInterface.createTable("events",{
        event_id:{
            type:Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false,
        },
        admin_id:{
            type:Sequelize.BIGINT,
            allowNull:false
        },
        attachment_line_id:{
            type:Sequelize.BIGINT,
            allowNull:false
        },
        event_name:{
            type:Sequelize.STRING,
            allowNull:false
        },
        description:{
            type:Sequelize.TEXT,
            allowNull:false
        },
        target_participants:{
            type:Sequelize.STRING,
            allowNull:false
        },
        status:{
            type: Sequelize.ENUM('Ongoing','Canceled','Ended'),
            allowNull: false
        },
        startDate:{
            type:Sequelize.DATE,
            allowNull: false
        },
        endDate:{
          type:Sequelize.DATE,
          allowNull: false
        },
        registration_form_url:{
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

      }).then(() => queryInterface.addConstraint('events',{
        fields:['admin_id'],
        type: 'FOREIGN KEY',
        name: 'FK_events_1', // useful if using queryInterface.removeConstraint
        references: {
          table: 'users',
          field: 'user_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })).then(() => queryInterface.addConstraint('events',{
        fields:['attachment_line_id'],
        type: 'FOREIGN KEY',
        name: 'FK_events_2', // useful if using queryInterface.removeConstraint
        references: {
          table: 'attachment_lines',
          field: 'attachment_line_id',
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
    await queryInterface.dropTable("events");
  }
};
