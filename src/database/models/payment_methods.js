'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment_methods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payment_methods.init({
    name: {
      types : DataTypes.STRING.DataTypes,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Payment_methods',
  });
  return Payment_methods;
};