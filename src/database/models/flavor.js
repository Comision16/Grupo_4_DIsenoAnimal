'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flavor extends Model {
    static associate(models) {
      Flavor.hasMany(models.stock,{
        as : "flavor_stock",
        foreignKey : "flavorId"
      })
      Flavor.hasMany(models.Product, {
        as : "flavor_product",
        foreignKey : "brandId"
      });
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
