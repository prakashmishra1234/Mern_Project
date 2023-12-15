const sendToken = (user, statuscode, res, message) => {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    // httpOnly: true,
  };
  const userId = user._id.toString();
  res.status(statuscode).cookie("token", token, options).json({
    success: true,
    message: message,
    id: userId,
  });
};

module.exports = sendToken;
