'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flavor extends Model {
    static associate(models) {
      Flavor.hasMany(models.Product, {foreignKey: 'flavorId'});
      Flavor.hasMany(models.Stock, {foreignKey: 'flavorId'});
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
