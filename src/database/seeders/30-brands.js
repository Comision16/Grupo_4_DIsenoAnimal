'use strict';

const productsJSON = require("../../data/productos.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Brands', 
      [...new Set(productsJSON.map(product => product.brand))].map(brand => ({
        name: brand,
        createdAt: new Date(),
        updatedAt: new Date()
      })), 
    {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Brands', null, {});
  }
};
