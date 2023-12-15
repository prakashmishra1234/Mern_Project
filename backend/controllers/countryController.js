const catchAsyncError = require("../middleware/catchAsyncError");
const mongoose = require("mongoose");
const ErrorHandler = require("../utils/errorHandler");

exports.countryCode = catchAsyncError(async (req, res, next) => {
  const db = await mongoose.connection;
  const collection = await db.collection("countrycode");
  const data = await collection.find({}).toArray();
  res.status(200).json({
    success: true,
    messgae: "Countries fetched successfully",
    countries: data,
  });
});
