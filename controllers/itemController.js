const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const Item = require("../models/itemsModel");
const categoryModel = require("../models/categoryModel");


exports.getAllItem = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Item.find(), req.query)
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
exports.createItem = catchAsync(async (req, res, next) => {
  const { category, ...rest } = req.body;
  const categoryExists = await categoryModel.findOne({ name: category });
  console.log(categoryExists);
  if (!categoryExists) {
    return next(new AppError("Category not found", 404));
  }

  const categoryId = categoryExists._id;
  const newItem = await Item.create({
    ...req.body,
    category: categoryId,
  });

  res.status(201).json({
    status: "success",
    data: {
      data: newItem,
    },
  });
});
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
exports.updateItem = catchAsync(async (req, res, next) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
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
