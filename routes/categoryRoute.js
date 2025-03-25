const express = require("express");
const router = express.Router();

// Mock data for categories
const categories = [
  { id: 1, name: "Coffee" },
  { id: 2, name: "Tea" },
  { id: 3, name: "Pastries" },
];

// GET all categories
router.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    data: categories,
  });
});

// GET a single category by ID
router.get("/:id", (req, res) => {
  const category = categories.find(cat => cat.id === parseInt(req.params.id));

  if (!category) {
    return res.status(404).json({
      status: "fail",
      message: "Category not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: category,
  });
});

// POST a new category
router.post("/", (req, res) => {
  const { name } = req.body;
  const newCategory = {
    id: categories.length + 1,
    name,
  };

  categories.push(newCategory);

  res.status(201).json({
    status: "success",
    data: newCategory,
  });
});

// DELETE a category by ID
router.delete("/:id", (req, res) => {
  const index = categories.findIndex(cat => cat.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Category not found",
    });
  }

  categories.splice(index, 1);

  res.status(204).json({
    status: "success",
    message: "Category deleted",
  });
});

module.exports = router;
