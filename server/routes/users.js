var express = require("express");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require("../models/User");
var router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(409).json({ message: "Email Already Exist" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { _id: newUser._id, email, name },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    return res.status(201).json({ status: "OK", token: token });
  } catch (error) {
    res.status(400).json();
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { _id: user._id, email, name: user.name },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );
      return res.status(200).json({ status: "OK", token: token });
    }
    res.status(400).json({ message: "Invalid Credentials" });
  } catch (error) {
    res.status(400).json();
  }
});

module.exports = router;
