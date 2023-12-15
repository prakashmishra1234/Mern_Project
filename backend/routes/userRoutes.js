const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  forgetPassword,
  resetPassword,
} = require("../controllers/userController");
const { isAuthenticateUser } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgetPassword").post(forgetPassword);
router.route("/resetPassword/:token").put(resetPassword);
router.route("/logout").get(isAuthenticateUser, logoutUser);
router.route("/me").get(isAuthenticateUser, getUserDetails);

module.exports = router;
