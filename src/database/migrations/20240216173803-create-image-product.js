'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Image_products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      file: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model : {
            tableName: "Products"
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Image_products');
  }
};