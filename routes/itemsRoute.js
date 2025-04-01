const express = require("express");
const itemController = require("../controllers/itemController");
const router = express.Router();

router
  .route("/")
  .get(itemController.getAllItem)
  .post(itemController.createItem);

module.exports = router;
