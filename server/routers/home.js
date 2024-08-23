const express = require("express");
const router = express.Router();

const HomeController = require("../controllers/HomeController");

router.get("/news", HomeController.getAllNews);
router.get("/schedule", HomeController.getAllSchedule);
module.exports = router;
