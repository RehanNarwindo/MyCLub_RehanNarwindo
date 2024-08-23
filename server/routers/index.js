const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const home = require("./home");
const myClub = require("./myClub");
const authentication = require("../middlewares/authentication");
const myDreamClub = require("./myDreamClub");

router.use("/home", home);
router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/loginbygoogle", UserController.googleLogin);

router.use("/myClub", authentication, myClub);
router.use("/myDreamClub", authentication, myDreamClub);

module.exports = router;
