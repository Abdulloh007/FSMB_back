const express = require("express");
const router = express.Router();
const reportController = require("../controllers/report.controller");
const checkAuth = require("../utils/checkAuth");

router.get("/reports", checkAuth, reportController.getReports);
router.post("/report/new", checkAuth, reportController.newReport);
router.put("/report/:id/edit", checkAuth, reportController.updateReportStatus);
module.exports = router;
