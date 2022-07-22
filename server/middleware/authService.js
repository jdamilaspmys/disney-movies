const tokenService = require("./tokenService");

const authService = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res
      .status(401)
      .json({ message: "A token is required for authentication" });
  }
  try {
    tokenService.verifyToken(token);
    const decoded = tokenService.decoded(token);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  return next();
};

module.exports = authService;
