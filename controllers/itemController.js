const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const Item = require("../models/itemsModel");
const categoryModel = require("../models/categoryModel");
const upload = require("./uploadController");
const mongoose = require("mongoose");

exports.getAllItem = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Item.find().populate("category"), req.query)
    .filter()
    .limitFields()
    .paginate()
    .sort();

  const item = await features.query;

  res.status(201).json({
    status: "success",
    data: { item },
    results: item.length,
  });
});
exports.createItem = [
  upload.single("image"),
  catchAsync(async (req, res, next) => {
    const { category, ...rest } = req.body;
    const categoryExists = await categoryModel.findOne({ name: category });
    console.log(categoryExists);
    if (!categoryExists) {
      return next(new AppError("Category not found", 404));
    }
    const imagePath = req.file ? req.file.path : null;

    const categoryId = categoryExists._id;
    const newItem = await Item.create({
      ...req.body,
      category: categoryId,
      image: imagePath,
    });
    console.log(imagePath);

    res.status(201).json({
      status: "success",
      data: {
        data: newItem,
      },
    });
  }),
];
exports.deleteItem = catchAsync(async (req, res, next) => {
  const item = await Item.findByIdAndDelete(req.params.id);
  if (!item) {
    return next(new AppError("No item found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
  });
});
exports.getItem = catchAsync(async (req, res, next) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    return next(new AppError("No item found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      item,
    },
  });
});
exports.updateItem = [
  upload.single("image"),
  catchAsync(async (req, res, next) => {
    const { category, ...rest } = req.body;

    const updateData = { ...rest };

    // If category name is sent, find its ObjectId and replace it
    if (category) {
      const categoryExists = await categoryModel.findOne({ name: category });
      if (!categoryExists) {
        return next(new AppError("Category not found", 404));
      }
      updateData.category = categoryExists._id;
    }

    // If an image file was uploaded, add the image path
    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedItem) {
      return next(new AppError("Item not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: updatedItem,
      },
    });
  }),
];

// exports.updateItem = catchAsync(async (req, res, next) => {
//   const item = await Item.findById(req.params.id);

//   if (!item) {
//     return next(new AppError("No item found with that ID", 404));
//   }

//   // فیلدهای متنی
//   item.name = req.body.name || item.name;
//   item.description = req.body.description || item.description;
//   item.category = req.body.category || item.category;
//   item.price = req.body.price || item.price;
//   item.order = req.body.order || item.order;

//   // عکس (فایل جدید اگر آمده)
//   if (req.file) {
//     item.image = req.file.path;
//   }

//   await item.save();

//   res.status(200).json({
//     status: "success",
//     data: {
//       item,
//     },
//   });
// });
