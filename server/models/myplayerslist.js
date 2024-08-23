"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyPlayersList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyPlayersList.belongsTo(models.MyDreamClub, {
        foreignKey: "id_myDreamTeam",
      });
    }
  }
  MyPlayersList.init(
    {
      nama: DataTypes.STRING,
      nomor: DataTypes.STRING,
      photo: DataTypes.STRING,
      position: DataTypes.STRING,
      id_rapidAPI: DataTypes.INTEGER,
      id_myDreamTeam: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "MyPlayersList",
    }
  );
  return MyPlayersList;
};
