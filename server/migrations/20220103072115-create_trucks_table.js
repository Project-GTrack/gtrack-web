'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("trucks",{
      truck_id:{
          type: Sequelize.BIGINT,
          primaryKey:true,
          autoIncrement:true,
          allowNull:false
      },
      user_id:{
          type: Sequelize.BIGINT,
          allowNull:false
      },
      plate_no:{
          type: Sequelize.STRING,
          allowNull:false
      },
      model:{
          type: Sequelize.STRING,
          allowNull:false
      },
      active:{
          type: Sequelize.TINYINT,
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
    }).then(() => queryInterface.addConstraint('trucks',{
      fields:['user_id'],
      type: 'FOREIGN KEY',
      name: 'FK_trucks_1', // useful if using queryInterface.removeConstraint
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
    await queryInterface.dropTable("trucks");
  }
};
