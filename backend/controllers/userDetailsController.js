const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendData = require("../utils/sendData");

// Add bio
exports.addBio = catchAsyncError(async (req, res, next) => {
  const { bio } = req.body;

  if (!bio) {
    return next(new ErrorHandler("Bio is required.", 400));
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }

  user.bio = bio;
  user.save({ validateBeforeSave: false });

  sendData(user, 200, res, "Bio added successfully.");
});

// get bio
exports.getBio = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler("User not found.", 400));
  }

  sendData({ bio: user.bio }, 200, res, "Bio fetched successfully.");
});

// follow user
exports.followUser = catchAsyncError(async (req, res, next) => {
  const { userId } = req.body;

  if (!userId) {
    return next(new ErrorHandler("userId is required.", 400));
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler("User not found.", 400));
  }

  const userToFollow = await User.findById(userId);

  if (!userToFollow) {
    return next(new ErrorHandler("User to follow not found.", 400));
  }

  if (!user.followings) {
    user.followings = [];
  }
  if (!userToFollow.followers) {
    userToFollow.followers = [];
  }

  if (user.followings.includes(userToFollow.id)) {
    return next(
      new ErrorHandler(
        `You are already following ${userToFollow.fullname}.`,
        400
      )
    );
  }

  await User.findByIdAndUpdate(
    req.user.id,
    { $addToSet: { followings: userToFollow.id } },
    { new: true, runValidators: false }
  );

  await User.findByIdAndUpdate(
    userToFollow.id,
    { $addToSet: { followers: user.id } },
    { new: true, runValidators: false }
  );

  sendData({}, 200, res, `You followed ${userToFollow.fullname}`);
});
