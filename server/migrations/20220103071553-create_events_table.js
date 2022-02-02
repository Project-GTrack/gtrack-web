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
        participants:{
            type:Sequelize.STRING,
            allowNull:false
        },
        status:{
            type:Sequelize.TINYINT,
            allowNull: false
        },
        date:{
            type:Sequelize.DATE,
            allowNull: false
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
    await queryInterface.dropTable("events");
  }
};
