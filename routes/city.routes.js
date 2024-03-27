const express = require("express");
const router = express.Router();
const cityController = require("../controllers/city.controller");
const checkAuth = require("../utils/checkAuth");

router.get("/city", checkAuth, cityController.getCities);
router.post("/city/new", checkAuth, cityController.newCity);

module.exports = router;
