const mongoose = require("mongoose");

const schema = mongoose
  .Schema({
    Title: String,
    Synopsis: String,
    Genre: String,
    Year: Number,
  })
  .index({ Title: "text" });

module.exports = mongoose.model("MOVIE", schema);
