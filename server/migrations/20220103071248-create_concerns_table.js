'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("concerns",{
      concern_id:{
        type:Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false,
    },
    resident_id:{
        type:Sequelize.BIGINT,
        allowNull:false
    },
    attachment_line_id:{
        type:Sequelize.BIGINT,
        allowNull: false
    },
    subject:{
        type:Sequelize.STRING,
        allowNull:false
    },
    message:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    status:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    },
    classification:{
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
    }).then(() => queryInterface.addConstraint('concerns',{
      fields:['resident_id'],
      type: 'FOREIGN KEY',
      name: 'FK_concerns_1', // useful if using queryInterface.removeConstraint
      references: {
        table: 'users',
        field: 'user_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })).then(() => queryInterface.addConstraint('concerns',{
      fields:['attachment_line_id'],
      type: 'FOREIGN KEY',
      name: 'FK_concerns_2', // useful if using queryInterface.removeConstraint
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
    await queryInterface.dropTable("concerns");
  }
};
