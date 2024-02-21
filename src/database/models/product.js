'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.Image_products,{
        as : "image_product",
        foreignKey : "productId"
      })
      Product.belongsTo(models.Specie,{
      as : "product_specie",
     foreignKey : "specieId"
      })
      Product.belongsTo(models.Flavor,{
       as : "product_flavor",
        foreignKey : "brandId"
    })
    Product.hasMany(models.stock, {
      as : "product_stocks",
      foreignKey : "productId"
    });
    Product.belongsTo(models.Filing, {
      as : "product_filing",
      foreignKey : "filingId"
    });
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

