const express = require("express");
const router = express.Router();

const MyDreamClubControllers = require("../controllers/MyDreamClubController");

router.get("/", MyDreamClubControllers.getMyDreamClub);
router.post("/", MyDreamClubControllers.CreateMyDreamClub);
router.delete("/:id", MyDreamClubControllers.deleteMyDreamclub);
router.post("/generateLogo", MyDreamClubControllers.generateLogo);
router.get("/searchPlayer", MyDreamClubControllers.searchPlayerRapidapi);
router.post("/setPlayer", MyDreamClubControllers.setPlayer);

module.exports = router;
