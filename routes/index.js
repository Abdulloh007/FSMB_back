const express = require('express');
const router = express.Router();

const userRouter = require('./user.routes');
const clubRouter = require('./club.routes');

router.use('/', userRouter);
router.use('/' , clubRouter)
module.exports = router;
