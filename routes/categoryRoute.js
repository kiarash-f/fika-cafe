const express = require("express");
const categoryController = require("../controllers/categoryController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(categoryController.getAllCategory)
  .post(authController.protect, categoryController.createCategory);
router
  .route("/:id")
  .get(categoryController.getCategory)
  .patch(authController.protect, categoryController.updateCategory)
  .delete(authController.protect, categoryController.deleteCategory);

module.exports = router;
