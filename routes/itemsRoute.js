const express = require("express");
const itemController = require("../controllers/itemController");
const authController = require("../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(itemController.getAllItem)
  .post(authController.protect, itemController.createItem);

router
  .route("/:id")
  .delete(authController.protect, itemController.deleteItem)
  .get(itemController.getItem)
  .patch(authController.protect, itemController.updateItem);

module.exports = router;
