'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Species extends Model {
 
    static associate(models) {
<<<<<<< HEAD
      Species.hasMany(models.Product,{
        as : "specie_product",
        foreignKey : "specieId"
      })
=======
      Species.hasMany(models.Pet , {
        as : "mascota",
        foreignKey : "specieId"
      })
       
      Species.hasMany(models.Product , {
        as : "species_product",
        foreignKey : "specieId"
      }) 
>>>>>>> 606fe8aac1a1b53cae7b78eb28aa5b28f0465a57
    }
  }
  Species.init({
    name:{
     type: DataTypes.STRING,
     allowNull : false
    } 
  }, {
    sequelize,
    modelName: 'Specie',
  });
  return Species;
};