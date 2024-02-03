const express = require("express");
const router = express.Router();
const clubController = require("../controllers/club.controller");
const checkAuth = require("../utils/checkAuth");
router.get("/clubs", clubController.getClubs);
router.get("/club/:id", clubController.getClubById);
router.post("/clubs/new", checkAuth, clubController.newClub);

module.exports = router;
