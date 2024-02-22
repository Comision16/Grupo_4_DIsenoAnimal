'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image_product extends Model {
    static associate(models) {
      Image_product.belongsTo(models.Product,{
        as : "Product",
        foreignKey : "productId"
      })
    }
  };
  Image_product.init({
    file: DataTypes.STRING,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Image_products',
  });
  return Image_product;
};
