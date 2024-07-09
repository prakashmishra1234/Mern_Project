const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendData = require("../utils/sendData");
const ApiFeatures = require("../utils/ApiFeatures");

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

  sendData(user.bio, 200, res, "Bio added successfully.");
});

// get bio
exports.getBio = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler("User not found.", 400));
  }
  sendData(user.bio, 200, res, "Bio fetched successfully.");
});

// follow user
exports.followUser = catchAsyncError(async (req, res, next) => {
  const { userId } = req.body;

  if (!userId) {
    return next(new ErrorHandler("userId is required.", 400));
  }

  if (req.user.id === userId) {
    return next(new ErrorHandler("You can not follow yourself.", 400));
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

  sendData(null, 200, res, `You followed ${userToFollow.fullname}`);
});

// unfollow users
exports.unfollowUser = catchAsyncError(async (req, res, next) => {
  const { userId } = req.body;

  if (!userId) {
    return next(new ErrorHandler("userId is required.", 400));
  }

  if (req.user.id === userId) {
    return next(new ErrorHandler("You can not unfollow yourself.", 400));
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler("User not found.", 400));
  }

  const userToUnFollow = await User.findById(userId);

  if (!userToUnFollow) {
    return next(new ErrorHandler("User to follow not found.", 400));
  }

  if (!userToUnFollow.followers.includes(user.id)) {
    return next(
      new ErrorHandler(`You are not following ${userToUnFollow.fullname}.`, 400)
    );
  }

  await User.findByIdAndUpdate(
    req.user.id,
    { $pull: { followings: userToUnFollow.id } },
    { new: true, runValidators: false }
  );

  await User.findByIdAndUpdate(
    userToUnFollow.id,
    { $pull: { followers: user.id } },
    { new: true, runValidators: false }
  );

  sendData(null, 200, res, `You unfollowed ${userToUnFollow.fullname}`);
});

exports.getFollowers = catchAsyncError(async (req, res, next) => {
  const userId = req.body.userId; //|| req.user.id;

  if (!userId) {
    return next(new ErrorHandler("userId is required.", 400));
  }

  const user = await User.findById(userId).populate("followers");

  if (!user) {
    return next(
      new ErrorHandler("User not found with the provided userId.", 400)
    );
  }

  const resultPerPage = 10;
  const followersCount = user.followers.length;

  const apiFeature = new ApiFeatures(
    User.find({ _id: { $in: user.followers } }),
    req.query
  )
    .search()
    .filter()
    .pagination(resultPerPage);

  let followers = await apiFeature.query;

  const data = {
    followers,
    resultPerPage,
    followersCount,
  };

  sendData(data, 200, res, "Followers retrieved successfully.");
});

exports.getFollowings = catchAsyncError(async (req, res, next) => {
  const userId = req.body.userId; //|| req.user.id;

  if (!userId) {
    return next(new ErrorHandler("userId is required.", 400));
  }

  const user = await User.findById(userId).populate("followings");

  if (!user) {
    return next(
      new ErrorHandler("User not found with the provided userId.", 400)
    );
  }

  const resultPerPage = 10;
  const followingsCount = user.followings.length;

  const apiFeature = new ApiFeatures(
    User.find({ _id: { $in: user.followings } }),
    req.query
  )
    .search()
    .filter()
    .pagination(resultPerPage);

  let followings = await apiFeature.query;

  const data = {
    followings,
    resultPerPage,
    followingsCount,
  };

  sendData(data, 200, res, "Followings retrieved successfully.");
});
