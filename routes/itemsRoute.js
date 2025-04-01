const express = require("express");
const itemController = require("../controllers/itemController");
const router = express.Router();

router
  .route("/")
  .get(itemController.getAllItem)
  .post(itemController.createItem);

router
  .route("/:id")
  .delete(itemController.deleteItem)
  .get(itemController.getItem)
  .patch(itemController.updateItem);

module.exports = router;
