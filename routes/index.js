const express = require("express");
const router = express.Router();

const userRouter = require("./user.routes");
const clubRouter = require("./club.routes");
const cityRouter = require("./city.routes");
const reportRouter = require("./report.routes");
router.use("/", userRouter);
router.use("/", clubRouter);
router.use("/", cityRouter);
router.use("/", reportRouter);


module.exports = router;
