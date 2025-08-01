const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category must have a name"],
    unique: true,
  },
  image: {
    type: String,
    required: [true, "Category must have an image"],
  },
  order: {
    type: Number,
    default: 0,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
