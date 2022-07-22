var jwt = require("jsonwebtoken");

const generateToken = (payload = {}, options = {}) => {
  const defaultOptions = {
    expiresIn: process.env.JWT_TOKEN_EXPIRATION || "1h",
  };
  return jwt.sign({ ...payload }, process.env.JWT_SECRET, {
    ...defaultOptions,
    ...options,
  });
};

const generateRefreshToken = (payload = {}, options = {}) => {
  const defaultOptions = {
    expiresIn: process.env.JWT_TOKEN_EXPIRATION || "1d",
  };
  return generateToken(payload, { ...defaultOptions, ...options });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const decoded = (token, options = {}) => {
  return jwt.decode(token, options);
};

module.exports = { generateToken, verifyToken, decoded, generateRefreshToken };
