'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("attachments",{
      attachment_id:{
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false
      },
      attachment_line_id:{
        type: Sequelize.BIGINT,
        allowNull:false
      },
      filename:{
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
    }).then(() => queryInterface.addConstraint('attachments',{
      fields:['attachment_line_id'],
      type: 'FOREIGN KEY',
      name: 'FK_attachments_2', // useful if using queryInterface.removeConstraint
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
    await queryInterface.dropTable("attachments");
  }
};
