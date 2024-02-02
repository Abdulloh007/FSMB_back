const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const checkAuth = require("../utils/checkAuth");

router.post("/register", UserController.createUser);
router.post("/login", UserController.loginUser);
router.get("/me", checkAuth, UserController.getMe);
router.delete("/profile", checkAuth, UserController.deleteProfile);
module.exports = router;
