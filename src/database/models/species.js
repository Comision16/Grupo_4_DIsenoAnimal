'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Species extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Species.hasMany(models.Pet , {
        as : "mascota",
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