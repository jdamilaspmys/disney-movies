const mongoose = require("mongoose");

const schema = mongoose.Schema({
  Title: String,
  Synopsis: String,
  Genre: String,
  Year: Number,
});

module.exports = mongoose.model("MOVIE", schema);
