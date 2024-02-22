'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Filing extends Model {

    static associate(models) {
      Filing.hasMany(models.Product, {
        as : "filing_products",
        foreignKey : "filingId"
      });
    }
  }
  Filing.init({
    value: DataTypes.INTEGER,
    measure: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Filing',
  });
  return Filing;
};