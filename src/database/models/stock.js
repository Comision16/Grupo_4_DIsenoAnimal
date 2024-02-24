'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stock extends Model {
   
    static associate(models) {
      stock.belongsTo(models.Flavor,{
        as : "stock_flavors",
        foreignKey : "flavorId"
      })  
      stock.belongsTo(models.Product,{
        as : "stock_product",
        foreignKey : "productId"
      })  
     }
  }
  stock.init({
    flavorId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false },  
  }, {
    sequelize,
    modelName: 'stock',
    timestamps: true,
  });
  return stock;
};