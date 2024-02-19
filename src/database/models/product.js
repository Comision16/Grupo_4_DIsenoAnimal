'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.belongsTo(models.Brand, { foreignKey: 'brandId', as: 'Brands' });
      this.belongsTo(models.Specie, { foreignKey: 'specieId', as: 'Species' });
      this.belongsTo(models.Filing, { foreignKey: 'filingId', as: 'Filings' });
    }
  }
  
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    brandId: DataTypes.INTEGER,
    specieId: DataTypes.INTEGER,
    flingId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};

