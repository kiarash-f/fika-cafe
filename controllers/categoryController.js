const Category = require("../models/categoryModel");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");

exports.getAllCategory = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Category.find(), req.query)
    .filter()
    .limitFields()
    .paginate()
    .sort();
  const categories = await features.query;

  res.status(200).json({
    status: "success",
    data: { categories },
    results: categories.length,
  });
});
exports.createCategory = catchAsync(async (req, res, next) => {
  const newCategory = await Category.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      data: newCategory,
    },
  });
});
exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new AppError("No category found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});
exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!category) {
    return next(new AppError("No category found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});
exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findOneAndDelete(req.params.id);
  if (!category) {
    return next(new AppError("No category found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
