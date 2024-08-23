"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyDreamClub extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyDreamClub.belongsTo(models.User, { foreignKey: "user_id" });
      MyDreamClub.hasMany(models.MyPlayersList, {
        foreignKey: "id_myDreamTeam",
        onDelete: "CASCADE",
      });
    }
  }
  MyDreamClub.init(
    {
      user_id: DataTypes.INTEGER,
      dream_club_name: DataTypes.STRING,
      logo: DataTypes.TEXT,
      stadium: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MyDreamClub",
    }
  );
  return MyDreamClub;
};
