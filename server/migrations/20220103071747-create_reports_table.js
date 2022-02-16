'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("reports",{
      report_id:{
          type:Sequelize.BIGINT,
          autoIncrement:true,
          primaryKey:true,
          allowNull:false,
      },
      driver_id:{
          type:Sequelize.BIGINT,
          allowNull:false
      },
      attachment_line_id:{
          type:Sequelize.BIGINT,
          allowNull:false
      },
      subject:{
          type:Sequelize.STRING,
          allowNull:false
      },
      message:{
          type:Sequelize.TEXT,
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
      degree:{
          type:Sequelize.STRING,
          allowNull:false
      },
      status:{
          type:Sequelize.TINYINT,
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

    }).then(() => queryInterface.addConstraint('reports',{
      fields:['driver_id'],
      type: 'FOREIGN KEY',
      name: 'FK_reports_1', // useful if using queryInterface.removeConstraint
      references: {
        table: 'users',
        field: 'user_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })).then(() => queryInterface.addConstraint('reports',{
      fields:['attachment_line_id'],
      type: 'FOREIGN KEY',
      name: 'FK_reports_2', // useful if using queryInterface.removeConstraint
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
    await queryInterface.dropTable("reports");
  }
};
