'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Filing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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