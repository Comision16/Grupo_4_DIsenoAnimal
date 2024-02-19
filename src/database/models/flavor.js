'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flavor extends Model {
    static associate(models) {
      
     
    }
  };
  Flavor.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Flavor',
  });
  return Flavor;
};
