const Category = require("../models/categoryModel");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const Upload = require("./uploadController");

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

exports.createCategory = [
  Upload.single("image"),
  catchAsync(async (req, res, next) => {
    const { name } = req.body;

    const imagePath = req.file ? req.file.filename : req.body.image;

    if (!name || !imagePath) {
      return next(new AppError("Name and image are required", 400));
    }
    const newCategory = await Category.create({
      name,
      image: imagePath,
    });
    res.status(201).json({
      status: "success",
      data: {
        data: newCategory,
      },
    });
  }),
];

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
exports.updateCategory = [
  Upload.single("image"),
  catchAsync(async (req, res, next) => {
    const { name, ...rest } = req.body;
    const updateData = { ...rest };

    // If name is sent, update it
    if (name) {
      updateData.name = name;
    }

    // If an image file was uploaded, update the image field
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCategory) {
      return next(new AppError("No category found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: updatedCategory,
      },
    });
  }),
];
exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return next(new AppError("No category found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
