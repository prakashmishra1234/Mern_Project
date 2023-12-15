const express = require("express");
const { countryCode } = require("../controllers/countryController");
const router = express.Router();

router.route("/countrycode").get(countryCode);

module.exports = router;
