// Role-based access control middleware
module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if user exists in request (should be set by auth middleware)
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        msg: "Authentication required" 
      });
    }

    // Check if user's role is allowed
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false,
        msg: "Access denied. Insufficient permissions." 
      });
    }

    next();
  };
};
