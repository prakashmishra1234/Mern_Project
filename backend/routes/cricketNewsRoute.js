const express = require("express");
const { isAuthenticateUser } = require("../middleware/auth");
const { getCricketNews } = require("../controllers/cricketNewsController");

const router = express.Router();

router.route("/cricketNews").get(isAuthenticateUser, getCricketNews);

module.exports = router;
