const express = require("express");
const router = express.Router();
const familyController = require("../controllers/family.controller");
const checkAuth = require("../utils/checkAuth");

router.get("/family", checkAuth, familyController.getFamily);
router.post("/family", checkAuth, familyController.addFamily);
router.delete("/family", checkAuth, familyController.removeFamily);

module.exports = router;
