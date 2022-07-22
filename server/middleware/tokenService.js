var jwt = require("jsonwebtoken");

const generateToken = (payload = {}, options = {}) => {
  const defaultOptions = {
    expiresIn: "1h",
  };
  return jwt.sign({ ...payload }, process.env.JWT_SECRET, {
    ...defaultOptions,
    ...options,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
