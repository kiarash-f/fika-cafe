const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category must have a name"],
    unique: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
