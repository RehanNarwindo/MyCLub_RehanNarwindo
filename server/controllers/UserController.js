const { User, MyClub, MyDreamClub } = require("../models/index");
const { comparePassword } = require("../helpers/bcryptPw");
const { createToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const { where } = require("sequelize");
const { emit } = require("../app");
const client = new OAuth2Client(
  "652278044819-o0sn4mtliu6t2ri1k808q9n7su8u4sgg.apps.googleusercontent.com"
);

const CLIENT_ID = process.env.CLIENT_ID;
class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "EmailIsRequired" };
      }
      if (!password) {
        throw { name: "PasswordIsRequired" };
      }
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        throw { name: "EmailOrPasswordInvalid" };
      }
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw { name: "EmailOrPasswordInvalid" };
      }
      const data = {
        email: user.email,
        id: user.id,
      };
      const access_token = createToken(data);
      res.status(200).json({ access_token, username: user.username });
    } catch (error) {
      next(error);
    }
  }
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const user = await User.create({
        username,
        email,
        password,
      });
      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    } catch (err) {
      next(err);
    }
  }
  static async googleLogin(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.googleToken,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();

      const data = await User.findOrCreate({
        where: { email: payload.email },
        hooks: false,
        defaults: {
          username: payload.name,
          email: payload.email,
          password: Math.random().toString(),
        },
      });

      const getData = await User.findOne({
        where: {
          email: payload.email,
        },
      });

      const result = {
        email: getData.email,
        id: getData.id,
      };
      const access_token = createToken(result);
      res.status(200).json({ access_token, username: getData.username });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
