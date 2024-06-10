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
  loginWithGoogle,
  loginWithGoogleRes,
  sendOtp,
  verifyOtp,
  loginWithMicrosoft,
  loginWithMicrosoftRes,
} = require("../controllers/userController");
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/sendotp").get(sendOtp);
router.route("/verifyOtp").post(verifyOtp);
router.route("/auth/google").get(loginWithGoogle);
router.route("/auth/google/callback").get(loginWithGoogleRes);
router.route("/auth/microsoft").get(loginWithMicrosoft);
router.route("/auth/microsoft/callback").get(loginWithMicrosoftRes);
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
