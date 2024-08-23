"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyClub extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyClub.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  MyClub.init(
    {
      user_id: DataTypes.INTEGER,
      club_name: DataTypes.STRING,
      club_logo: DataTypes.STRING,
      id_rapidAPI: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "MyClub",
    }
  );
  return MyClub;
};
