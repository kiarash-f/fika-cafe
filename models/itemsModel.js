const mongoose = require("mongoose");
const Category = require("./categoriesModel");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Item must have a name"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Item must have a description"],
  },
  price: {
    type: Number,
    required: [true, "Item must have a price"],
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: [true, "Item must belong to a category"],
  },
  image: { type: String },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  available: {
    type: Boolean,
    default: true,
  },
});
const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
