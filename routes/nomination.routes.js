const express = require("express");
const router = express.Router();
const nominationController = require("../controllers/nomination.controller");
const checkAuth = require("../utils/checkAuth");

router.get("/nominations", checkAuth, nominationController.getAllNominations);
router.get("/nomination/:id", checkAuth, nominationController.getNominationById);
router.post("/nominations/new", checkAuth, nominationController.newNomination);
router.delete("/nomination/:id", checkAuth, nominationController.deleteNomination);
router.put("/nomination/:id", checkAuth, nominationController.editNomination);

module.exports = router;
