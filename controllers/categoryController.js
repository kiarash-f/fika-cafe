const category = require("../models/categoryModel");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");

exports.getAllCategory = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(category.find(), req.query)
    .filter()
    .limitFields()
    .paginate()
    .sort();
  const categories = await features.query;

  res.status(200).json({
    status: "success",
    data: { category },
    results: categories.length,
  });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  const newCategory = await category.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      data: newCategory,
    },
  });
});
