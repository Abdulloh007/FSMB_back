const express = require("express");
const router = express.Router();
const anthropometryController = require("../controllers/anthropometry.controller");
const checkAuth = require("../utils/checkAuth");

router.get(
  "/anthropometry",
  checkAuth,
  anthropometryController.getAnthropometry
);
router.post(
  "/anthropometry",
  checkAuth,
  anthropometryController.createAnthropometry
);

router.put(
  "/anthropometry",
  checkAuth,
  anthropometryController.updateAnthropometry
);
module.exports = router;
