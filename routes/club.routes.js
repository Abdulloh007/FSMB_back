const express = require("express");
const router = express.Router();
const clubController = require("../controllers/club.controller");
const checkAuth = require("../utils/checkAuth");

router.get("/clubs", checkAuth, clubController.getClubs);
router.get("/my-club", checkAuth, clubController.getMyClub);
router.get("/club/:id", checkAuth, clubController.getClubById);
router.post("/clubs/new", checkAuth, clubController.newClub);
router.delete("/club/:id", checkAuth, clubController.deleteClub);
router.put("/club/:id", checkAuth, clubController.editClub);
router.post("/club/:id/enter", checkAuth, clubController.enterToClub);
router.post("/club/:id/leave", checkAuth, clubController.leaveClub);
router.post("/club/:id/nomy", checkAuth, clubController.setNomination);
router.post("/club/:id/league", checkAuth, clubController.setLeague);

module.exports = router;
