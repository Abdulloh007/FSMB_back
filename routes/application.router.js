const express = require("express");
const router = express.Router();
const checkAuth = require("../utils/checkAuth");
const applicationController = require("../controllers/application.controller");

router.post(
  "/application/new",
  checkAuth,
  applicationController.createApplication
);
router.get("/applications", checkAuth, applicationController.getAllApplications);
router.get("/my-applications", checkAuth, applicationController.getMyApplications);
router.put("/application/:id", checkAuth, applicationController.updateApplication);
router.delete(
  "/application/:id",
  checkAuth,
  applicationController.deleteApplication
);

module.exports = router;