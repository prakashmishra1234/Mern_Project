const mongoose = require("mongoose");

const cricNewsList = new mongoose.Schema({
  cbId: {
    type: Number,
    unique: true,
  },

  hline: {
    type: String,
  },
  intro: {
    type: String,
  },
  pubTime: {
    type: String,
  },
  source: {
    type: String,
  },
  storyType: {
    type: String,
  },
  cbimageId: {
    type: Number,
  },
  seoHeadline: {
    type: String,
  },
  context: {
    type: String,
  },
  coverImage: {
    cbId: {
      type: String,
    },
    caption: {
      type: String,
    },
    source: {
      type: String,
    },
  },
});

module.exports = mongoose.model("CricNewsList", cricNewsList);
