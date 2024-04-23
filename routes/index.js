const express = require("express");
const router = express.Router();

const userRouter = require("./user.routes");
const tournamentRouter = require("./torunament.routes");
const clubRouter = require("./club.routes");
const nominationRouter = require("./nomination.routes");
const reportRouter = require("./report.routes");
const familyRouter = require("./family.routes");
const anthropometryRouter = require("./anthropometry.routes");
const leagueRouter = require("./league.routes");
const categoryRouter = require("./category.routes");
const applicationRouter = require("./application.router");

router.use("/", userRouter);
router.use("/", clubRouter);
router.use("/", nominationRouter);
router.use("/", reportRouter);
router.use("/", familyRouter);
router.use("/", anthropometryRouter);
router.use("/", leagueRouter);
router.use("/", categoryRouter);
router.use("/", tournamentRouter);
router.use("/", applicationRouter);

module.exports = router;
