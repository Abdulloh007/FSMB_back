const express = require("express");
const router = express.Router();
const checkAuth = require("../utils/checkAuth");
const tournamentController = require("../controllers/tournament.controller");

router.post(
  "/tournament/new",
  checkAuth,
  tournamentController.createTournament
);
router.get("/tournaments", checkAuth, tournamentController.getAllTournaments);
router.get("/my-tournaments", checkAuth, tournamentController.getMyTournaments);
router.put("/tournament/:id", checkAuth, tournamentController.updateTournament);
router.delete(
  "/tournament/:id",
  checkAuth,
  tournamentController.deleteTournament
);

module.exports = router;
