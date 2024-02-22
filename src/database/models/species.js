'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Species extends Model {
 
    static associate(models) {
      Species.hasMany(models.Pet , {
        as : "mascota",
        foreignKey : "specieId"
      })
       
      Species.hasMany(models.Product , {
        as : "species_product",
        foreignKey : "specieId"
      }) 
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