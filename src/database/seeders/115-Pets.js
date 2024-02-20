'use strict';

const usersJSON = require("../../data/users.json")

var user = 0

const usersDB = usersJSON.map(({mascota}) => {

  user = user + 1;

  return {
    name : mascota,
    specieId : mascota == "perro" ? 1 : mascota == "gato" ? 2 : mascota == "ave" ? 3 : mascota == "pez" ? 4 : mascota == "roedor" ? 5 : 6,
    userId : user,
    createdAt : new Date(),
    updatedAt : new Date() 
  }
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Pets',usersDB, {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pets', null, {});
  }
};
