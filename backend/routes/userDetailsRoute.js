const express = require("express");
const { isAuthenticateUser } = require("../middleware/auth");
const { addBio, getBio } = require("../controllers/userDetailsController");

const router = express.Router();

router.route("/addBio").post(isAuthenticateUser, addBio);
router.route("/getBio").get(isAuthenticateUser, getBio);

module.exports = router;
