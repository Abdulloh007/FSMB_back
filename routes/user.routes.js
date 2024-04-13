const express = require("express");
const multer = require('multer');
const router = express.Router();
const UserController = require("../controllers/user.controller");
const checkAuth = require("../utils/checkAuth");

// Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

router.post("/register", UserController.createUser);
router.post("/login", UserController.loginUser);
router.post("/uploadAvatar", upload.single('file'), UserController.uploadUserPhoto)
router.get("/me", checkAuth, UserController.getMe);
router.get("/user/:id", checkAuth, UserController.getById);
router.get("/s_user/:name", checkAuth, UserController.searchUser);
router.delete("/profile", checkAuth, UserController.deleteProfile);
router.put("/profile/edit", checkAuth, UserController.editProfile);

router.post("/user/changeRole", checkAuth, UserController.changeUserRole);
module.exports = router;
