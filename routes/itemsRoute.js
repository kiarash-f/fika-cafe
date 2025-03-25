const express = require("express");
const router = express.Router();

// Mock data for items
const items = [
  { id: 1, name: "Cappuccino", categoryId: 1, price: 3.5 },
  { id: 2, name: "Latte", categoryId: 1, price: 3.0 },
  { id: 3, name: "Green Tea", categoryId: 2, price: 2.5 },
  { id: 4, name: "Croissant", categoryId: 3, price: 2.0 },
];

// GET all items
router.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    data: items,
  });
});

// GET items by category ID
router.get("/category/:categoryId", (req, res) => {
  const categoryItems = items.filter(item => item.categoryId === parseInt(req.params.categoryId));

  if (categoryItems.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "No items found for this category",
    });
  }

  res.status(200).json({
    status: "success",
    data: categoryItems,
  });
});

// GET a single item by ID
router.get("/:id", (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));

  if (!item) {
    return res.status(404).json({
      status: "fail",
      message: "Item not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: item,
  });
});

// POST a new item
router.post("/", (req, res) => {
  const { name, categoryId, price } = req.body;
  const newItem = {
    id: items.length + 1,
    name,
    categoryId,
    price,
  };

  items.push(newItem);

  res.status(201).json({
    status: "success",
    data: newItem,
  });
});

// DELETE an item by ID
router.delete("/:id", (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Item not found",
    });
  }

  items.splice(index, 1);

  res.status(204).json({
    status: "success",
    message: "Item deleted",
  });
});

module.exports = router;
