var jwt = require("jsonwebtoken");
const { token } = require("morgan");

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

const decoded = (token) => {
  return jwt.decode(token);
};

module.exports = { generateToken, verifyToken, decoded };
