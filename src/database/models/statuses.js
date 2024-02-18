'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Statuses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Statuses.init({
    name: {
      types : DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Statuses',
  });
  return Statuses;
};