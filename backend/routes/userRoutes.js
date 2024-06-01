const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  forgetPassword,
  resetPassword,
  getAllUser,
} = require("../controllers/userController");
const { isAuthenticateUser, isUserAdmin } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgetPassword").post(forgetPassword);
router.route("/resetPassword/:token").put(resetPassword);
router.route("/logout").get(isAuthenticateUser, logoutUser);
router.route("/me").get(isAuthenticateUser, getUserDetails);
router.route("/users").get(isAuthenticateUser, isUserAdmin, getAllUser);

module.exports = router;
