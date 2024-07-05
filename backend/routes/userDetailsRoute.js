const express = require("express");
const { isAuthenticateUser } = require("../middleware/auth");
const {
  addBio,
  getBio,
  followUser,
  unfollowUser,
  getFollowers,
} = require("../controllers/userDetailsController");

const router = express.Router();

router.route("/addBio").post(isAuthenticateUser, addBio);
router.route("/getBio").get(isAuthenticateUser, getBio);
router.route("/followUser").post(isAuthenticateUser, followUser);
router.route("/unFollowUser").post(isAuthenticateUser, unfollowUser);
router.route("/getFollowers").post(isAuthenticateUser, getFollowers);

module.exports = router;
