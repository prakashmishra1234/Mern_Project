const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.isAuthenticateUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decodedData.id);

  if (!user) {
    return next(new ErrorHandler("user not found.", 400));
  }

  req.user = user;
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }
    next();
  };
};

exports.verifiedUser = catchAsyncError(async (req, res, next) => {
  if (!req.user.isVerified) {
    return next(
      new ErrorHandler(`Please verify email to access this resource.`, 403)
    );
  }
  next();
});
