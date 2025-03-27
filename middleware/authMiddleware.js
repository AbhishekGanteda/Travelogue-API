const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Middleware to verify JWT token
exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied: No Token Provided" });

    // Verify token
    const decoded = jwt.verify(token, "your_secret_key");
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

// Middleware to check if the user exists
exports.checkUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    req.userDetails = user; // Attach user details to request
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
