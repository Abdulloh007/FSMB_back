const express = require("express");
const router = express.Router();

const userRouter = require("./user.routes");
const clubRouter = require("./club.routes");
const cityRouter = require("./city.routes");
const reportRouter = require("./report.routes");
const familyRouter = require("./family.routes");
const anthropometryRouter = require("./anthropometry.routes");
const tournamentRouter = require("./torunament.routes");
const leagueRouter = require("./league.routes");
const categoryRouter = require("./category.routes");

router.use("/", userRouter);
router.use("/", clubRouter);
router.use("/", cityRouter);
router.use("/", reportRouter);
router.use("/", familyRouter);
router.use("/", anthropometryRouter);
router.use("/", tournamentRouter);
router.use("/", leagueRouter);
router.use("/", categoryRouter);

module.exports = router;
