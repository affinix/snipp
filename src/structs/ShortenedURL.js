const mongoose = require("mongoose");
mongoose.set("debug", true);

const ShortenedURL = new mongoose.Schema({
  url: { type: String, required: true },
  id: { type: String, required: true }
});

module.exports = mongoose.model("ShortenedURL", ShortenedURL);
