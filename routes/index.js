const express = require("express");
const router = express.Router();

const userRouter = require("./user.routes");
const clubRouter = require("./club.routes");
const cityRouter = require("./city.routes");
const reportRouter = require("./report.routes");
const familiyRouter = require("./family.routes");

router.use("/", userRouter);
router.use("/", clubRouter);
router.use("/", cityRouter);
router.use("/", reportRouter);
router.use("/", familiyRouter);

module.exports = router;
