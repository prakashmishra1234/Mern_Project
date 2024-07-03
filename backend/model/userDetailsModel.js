const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema({
  bio: {
    type: String,
    required: ["Users bio is required."],
    maxlength: [1000, "Bio can not exceed 1000 characters."],
    minlength: [500, "Bio should have at least 500 characters."],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    ref: "User",
    required: ["Users reference is required."],
  },
});

module.exports = mongoose.model("userDetails", userDetailsSchema);
