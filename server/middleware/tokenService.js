var jwt = require("jsonwebtoken");

const generateToken = (payload = {}, options = {}) => {
  return jwt.sign({ ...payload }, process.env.JWT_SECRET, options);
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
