const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  forgetPassword,
  resetPassword,
  getAllUser,
  sendEmailVerificationLink,
  verifyEmail,
} = require("../controllers/userController");
const {
  isAuthenticateUser,
  authorizeRoles,
  verifiedUser,
} = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgetPassword").post(forgetPassword);
router.route("/resetPassword/:token").put(resetPassword);
router.route("/logout").get(isAuthenticateUser, logoutUser);
router
  .route("/emailVerification")
  .get(isAuthenticateUser, sendEmailVerificationLink);
router.route("/verifyEmail/:token").get(verifyEmail);
router.route("/me").get(isAuthenticateUser, getUserDetails);
router
  .route("/users")
  .get(isAuthenticateUser, authorizeRoles("admin"), getAllUser);

module.exports = router;
