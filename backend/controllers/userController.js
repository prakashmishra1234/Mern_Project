const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../model/userModel");
const ApiFeatures = require("../utils/ApiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtTokens");
const sendData = require("../utils/sendData");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Register User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { username, fullname, email, password } = req.body;
  const user = await User.create({
    username,
    fullname,
    email,
    password,
  });
  sendToken(user, 201, res, "User registered successfully");
});

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ErrorHandler("Please enter username and password", 400));
  }

  const user = await User.findOne({ username: username }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid username or password", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid username or password", 400));
  }

  sendToken(user, 200, res, "User logged in successfully");
});

//Logout user
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  sendData(null, 200, res, "User logged out successfully.");
});

// get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  sendData(req.user, 200, res, "User data fetched successfully");
});

// forgot password
exports.forgetPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new ErrorHandler("Please enter email", 400));
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return next(new ErrorHandler("Email not found", 400));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/reset-password/${resetToken}`;
  // const resetPasswordUrl = `${req.protocol}://localhost:3000/reset-password/${resetToken}`;
  const message = `Your password reset link is :- <br/><br/> <a href="${resetPasswordUrl}">click here to reset password</a> <br/><br/> If you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Mern_Project Password Recovery`,
      message,
    });
    sendData(null, 200, res, "Password recovery mail sent successfully.");
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res, "Password has been changed successfully");
});

// get all user only for admin
exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 10;
  const userCount = await User.countDocuments();
  const apiFeature = new ApiFeatures(User.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const users = await apiFeature.query;
  const data = {
    users: users,
    resultPerPage,
    userCount,
  };
  sendData(data, 200, res, "Users found successfully");
});
