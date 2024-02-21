'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    static associate(models) {
      Pet.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId"
      });
      Pet.belongsTo(models.Specie, {
        as: "especie",
        foreignKey: "specieId"
      })
    }
  }
  Pet.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false

    },
    specieId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Pet',
  });
  return Pet;
};