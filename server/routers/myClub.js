const express = require("express");
const router = express.Router();

const MyClubControllers = require("../controllers/MyClubController");

router.get("/", MyClubControllers.MyClub);
router.post("/", MyClubControllers.createMyclub);
router.delete("/:id", MyClubControllers.deleteMyclub);
router.get("/search", MyClubControllers.searchClubRapidapi);

module.exports = router;
