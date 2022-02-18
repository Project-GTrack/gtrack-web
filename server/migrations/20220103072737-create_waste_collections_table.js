'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("waste_collections",{
      weight_id:{
          type: Sequelize.BIGINT,
          primaryKey:true,
          autoIncrement:true,
          allowNull:false
      },
      driver_id:{
          type: Sequelize.BIGINT,
          allowNull:false
      },
      collection_weight_volume:{
          type:Sequelize.DOUBLE,
          allowNull:false
      },
      collection_date:{
          type:Sequelize.DATE,
          allowNull:false
      },
      collection_route:{
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
    }).then(() => queryInterface.addConstraint('waste_collections',{
      fields:['driver_id'],
      type: 'FOREIGN KEY',
      name: 'FK_waste_collections_1', // useful if using queryInterface.removeConstraint
      references: {
        table: 'users',
        field: 'user_id',
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
    await queryInterface.dropTable("waste_collections");
  }
};
