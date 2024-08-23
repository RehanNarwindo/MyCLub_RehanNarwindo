"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.MyClub, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
      User.hasOne(models.MyDreamClub, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "username is required",
          },
          notEmpty: {
            msg: "username is required",
          },
        },
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "email is required",
          },
          notEmpty: {
            msg: "email is required",
          },
          isEmail: {
            msg: "must email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password is required",
          },
          notEmpty: {
            msg: "password is required",
          },
          len: {
            args: [5, Infinity],
            msg: "password minimum length 5",
          },
        },
      },
      role: { type: DataTypes.STRING, defaultValue: "users" },
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          let salt = bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(user.password, salt);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
