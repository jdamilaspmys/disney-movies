var express = require("express");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
  generateToken,
  verifyToken,
  decoded,
} = require("../middleware/tokenService");
var router = express.Router();
const { DUMMY_USER } = require("../constant/dummy");
const authService = require("../middleware/authService");

router.post("/token", (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!(email === DUMMY_USER.email && password === DUMMY_USER.password)) {
      return res.status(400).json({ err: "invalid-credential" });
    }
    const accessToken = generateToken({ email });
    const refreshToken = generateToken({ email }, { expiresIn: "1d" });
    const result = {
      token: {
        accessToken,
        refreshToken,
      },
    };
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: "internal-server-error" });
  }
});

router.get("/about", authService, (req, res, next) => {
  res.status(200).send("Hello World");
});

router.post("/refresh-token", (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(401).json({ message: "Unauthorized" });
    }
    verifyToken(refreshToken);
    const decodeToken = decoded(refreshToken, { complete: true });
    const accessToken = generateToken({ email: decodeToken.payload.email });
    const result = {
      token: {
        accessToken,
        refreshToken,
      },
    };
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = router;
