'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.Image_products,{
        as : "Image_products",
        foreignKey : "productId"
      })

      Product.belongsTo(models.Specie,{
        as : "product_species",
        foreignKey : "specieId"
      })

      Product.hasMany(models.stock,{
        as : "product_stock",
        foreignKey : "productId"
      })
    }
  }
  
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    brandId: DataTypes.INTEGER,
    specieId: DataTypes.INTEGER,
    filingId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};

