const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const Item = require("../models/itemsModel");
const category = require("../models/categoryModel");

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
  
  // const category = await category.findOne({
  //   name: req.body.category,
  // });
  const newItem = Item.create(req.body);
  message: console.log(req.body);
  res.status(201).json({
    status: "success",
    data: {
      data: newItem,
    },
    
  });
});
