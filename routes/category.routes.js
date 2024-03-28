const express = require("express");
const router = express.Router();
const checkAuth = require("../utils/checkAuth");
const categoryController = require("../controllers/category.controller");

router.post(
    "/category/new",
    checkAuth,
    categoryController.createCategory
);
router.get("/categories", checkAuth, categoryController.getAllCategories);
router.put("/category/:id", checkAuth, categoryController.updateCategory);
router.delete("/category/:id", checkAuth, categoryController.deleteCategory);

module.exports = router;