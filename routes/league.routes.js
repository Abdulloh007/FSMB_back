const express = require("express");
const router = express.Router();
const checkAuth = require("../utils/checkAuth");
const leagueController = require("../controllers/league.controller");


router.post(
    "/league/new",
    checkAuth,
    leagueController.createLeague
);
router.get("/leagues", checkAuth, leagueController.getAllLeagues);
router.put("/league/:id", checkAuth, leagueController.updateLeague);
router.delete("/league/:id", checkAuth, leagueController.deleteLeague);

module.exports = router;