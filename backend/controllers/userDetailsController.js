const catchAsyncError = require("../middleware/catchAsyncError");
const UserDetails = require("../model/userDetailsModel");
const ErrorHandler = require("../utils/errorHandler");
const sendData = require("../utils/sendData");

// Add bio
exports.addBio = catchAsyncError(async (req, res, next) => {
  const { bio } = req.body;
  const userId = req.user.id;

  const user = await UserDetails.findOne({ user: userId });

  let userDetails;
  if (user) {
    user.bio = bio;
    userDetails = await user.save({ validateBeforeSave: false });
  } else {
    userDetails = await UserDetails.create({ bio, user: userId });
  }

  if (!userDetails) {
    return next(new ErrorHandler("Users bio add failed.", 400));
  }

  sendData(userDetails, 200, res, "Bio added successfully.");
});

// get bio
exports.getBio = catchAsyncError(async (req, res, next) => {
  const bio = await UserDetails.findOne({ user: req.user._id });

  if (!bio) {
    return next(new ErrorHandler("Users bio not found.", 400));
  }

  sendData(bio, 200, res, "Bio fetched successfully.");
});

// follow user
exports.followUser = catchAsyncError(async (req, res, next) => {});
