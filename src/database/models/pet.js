'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pet.belongsTo(models.User , {
        as : "user",
        foreingkey : "userId"
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