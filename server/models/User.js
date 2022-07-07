const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, unique: true },
    password: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema);
