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
        type:Sequelize.TINYINT,
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
    })
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
