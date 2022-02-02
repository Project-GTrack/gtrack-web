'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("announcements",{
       announcement_id:{
        type:Sequelize.BIGINT,
        autoIncrement:true,
        primaryKey:true,
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
      title:{
          type:Sequelize.STRING,
          allowNull:false
      },
      content:{
          type:Sequelize.TEXT,
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
    await queryInterface.dropTable("announcements");
  }
};
