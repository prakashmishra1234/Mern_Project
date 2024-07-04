const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../model/userModel");
const ApiFeatures = require("../utils/ApiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtTokens");
const sendData = require("../utils/sendData");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const axios = require("axios");

// Register User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { fullname, email, password } = req.body;

  if (!password) return next(new ErrorHandler("Password is required.", 400));

  if (password.length < 8)
    return next(
      new ErrorHandler("Password should contain minimum 8 character", 400)
    );

  const user = await User.create({
    fullname,
    email,
    password,
  });

  if (!user) {
    new ErrorHandler("User registration failed.", 400);
  }

  sendToken(
    user,
    201,
    res,
    "User registered successfully. Please verify your email."
  );
});

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    return next(new ErrorHandler("User already signed in.", 400));
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  let user = await User.findOne({ email: email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid username or password", 400));
  }

  if (!user.password) {
    return next(new ErrorHandler("Your login method is different", 400));
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
  const userCount = (await User.countDocuments()) - 1;
  const apiFeature = new ApiFeatures(User.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  let users = await apiFeature.query;
  users = users.filter((item) => {
    return item.id !== req.user.id;
  });
  const data = {
    users: users,
    resultPerPage,
    userCount,
  };
  sendData(data, 200, res, "Users found successfully");
});

//send email verification link
exports.sendEmailVerificationLink = catchAsyncError(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }

  if (req.user.isVerified) {
    return next(new ErrorHandler("User already verified", 400));
  }

  // Get email verificartion token
  const verificationToken = user.getEmailVerificationToken();
  await user.save({ validateBeforeSave: false });
  const emailVerificationUrl = `${req.protocol}://${req.get(
    "host"
  )}/verify-email/${verificationToken}`;
  const message = `Your email verification link is :- <br/><br/> <a href="${emailVerificationUrl}">click here to verify your email</a> <br/><br/> If you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Mern_Project Email Verification`,
      message,
    });
    sendData(null, 200, res, "Email verification mail sent successfully.");
  } catch (error) {
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// verify email
exports.verifyEmail = catchAsyncError(async (req, res, next) => {
  // creating token hash
  const emailVerificationToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    emailVerificationToken,
    emailVerificationExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Email verification token is invalid or has been expired",
        400
      )
    );
  }

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpire = undefined;

  await user.save();
  sendToken(user, 200, res, "Email verified successfully successfully");
});

// login with google
exports.loginWithGoogle = catchAsyncError(async (req, res, next) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_OAUTH_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_OAUTH_REDIRECT_URI}&response_type=code&scope=openid profile email&prompt=select_account`;
  sendData(url, 200, res, "Google login initiated successfully.");
});

// login with google response
exports.loginWithGoogleRes = catchAsyncError(async (req, res, next) => {
  const { code } = req.query;

  try {
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
        client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        code,
        redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
        grant_type: "authorization_code",
      }
    );

    const { access_token } = tokenResponse.data;

    const profileResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const { id, email, verified_email, name, picture } = profileResponse.data;

    let user = await User.findOne({ email });

    if (user) {
      user.isVerified = verified_email;
      user.picture = picture;
      user.googleId = id;
    } else {
      user = await User.create({
        username: id,
        fullname: name,
        email,
        password: null,
        isVerified: verified_email,
        picture,
        googleId: id,
      });
    }

    await user.save({ validateBeforeSave: false });

    sendToken(user, 201, res, "User logged in successfully.");
  } catch (error) {
    console.error(
      "\n Error in Google response: \n",
      error.response ? error.response.data : error.message
    );
    return next(new ErrorHandler("Something went wrong.", 400));
  }
});

// Send OTP
exports.sendOtp = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    return next(new ErrorHandler("User already signed in.", 400));
  }

  const { email, username } = req.query;

  if (!email && !username) {
    return next(new ErrorHandler("Please enter email or username.", 400));
  }

  let user;

  if (email) {
    user = await User.findOne({ email: email });
  }

  if (username) {
    user = await User.findOne({ username: username });
  }

  if (!user) {
    return next(new ErrorHandler("User not found with this details.", 400));
  }

  const verificationOtp = user.getEmailVerificationOtp();
  await user.save({ validateBeforeSave: false });
  const message = `Otp for signing in is :- ${verificationOtp} <br/><br/> If you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Mern_Project Otp Validation`,
      message,
    });
    sendData(null, 200, res, "Otp has been sent to your registered email.");
  } catch (error) {
    user.emailVerificationOtp = undefined;
    user.emailVerificationOtpExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// verify otp
exports.verifyOtp = catchAsyncError(async (req, res, next) => {
  const { email, otp, username } = req.body;
  let user;
  if (email) {
    user = await User.findOne({
      email: email,
      emailVerificationOtp: otp,
      emailVerificationOtpExpire: { $gt: Date.now() },
    });
    if (!user) {
      return next(
        new ErrorHandler("email / otp is invalid or otp is expired", 400)
      );
    }
  }

  if (username) {
    user = await User.findOne({
      username: username,
      emailVerificationOtpExpire: { $gt: Date.now() },
    });
    if (!user) {
      return next(
        new ErrorHandler("username / otp is invalid or otp is expired", 400)
      );
    }
  }

  user.emailVerificationOtp = undefined;
  user.emailVerificationOtpExpire = undefined;
  await user.save({ validateBeforeSave: false });
  sendToken(user, 200, res, "User logged in successfully");
});

// login with microsoft
exports.loginWithMicrosoft = catchAsyncError(async (req, res, next) => {
  const url = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${process.env.MICROSOFT_OAUTH_CLIENT_ID}&redirect_uri=${process.env.MICROSOFT_OAUTH_REDIRECT_URI}&response_type=code&scope=openid profile email User.Read User.Read.All&response_mode=query&nonce=nonce&prompt=select_account`;
  sendData(url, 200, res, "Microsoft login initiated successfully.");
});

// login with microsoft response
exports.loginWithMicrosoftRes = catchAsyncError(async (req, res, next) => {
  const { code } = req.query;

  try {
    // Exchange the authorization code for tokens
    const tokenResponse = await axios.post(
      "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      new URLSearchParams({
        client_id: process.env.MICROSOFT_OAUTH_CLIENT_ID,
        client_secret: process.env.MICROSOFT_OAUTH_CLIENT_SECRET,
        code: code,
        redirect_uri: process.env.MICROSOFT_OAUTH_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = tokenResponse.data;

    // Use the access token to get user data from Microsoft Graph
    const profileResponse = await axios.get(
      "https://graph.microsoft.com/v1.0/me",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const profile = profileResponse.data;

    // Example of extracting user information from the profile
    const { id, mail: email, displayName: name } = profile;

    let user = await User.findOne({ email });

    if (user) {
      user.isVerified = true;
      user.microsoftId = id;
    } else {
      user = await User.create({
        username: id,
        fullname: name,
        email: email,
        password: null,
        isVerified: true,
        microsoftId: id,
      });
    }

    await user.save({ validateBeforeSave: false });

    sendToken(user, 201, res, "User logged in successfully.");
  } catch (error) {
    console.log(error);
    console.error(
      "\n Error in microsoft response : \n",
      error.response ? error.response.data : error.message
    );
    return next(new ErrorHandler("Something went wrong.", 400));
  }
});
