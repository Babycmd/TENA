const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("Authorization");

  // Check if no token
  if (!token) {
    return res.status(401).json({ 
      success: false,
      msg: "No token, authorization denied" 
    });
  }

  // Verify token (handle "Bearer <token>" format)
  try {
    const tokenPart = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;
    const decoded = jwt.verify(tokenPart, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ 
      success: false,
      msg: "Token is not valid" 
    });
  }
};
