const mongoose = require("mongoose");
const category = require("./categoryModel");
const { schema } = require("./categoryModel");

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
itemSchema.pre('save', async function (next) {
  if (typeof this.category === 'string') {
    const category = await Category.findOne({ name: this.category });
    if (!category) {
      return next(new Error(`Category '${this.category}' not found`));
    }
    this.category = category._id; // Replace string with ObjectId
  }
  next();
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
