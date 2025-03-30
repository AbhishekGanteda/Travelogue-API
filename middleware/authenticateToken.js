const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401); // Unauthorized if no token is provided
  }

  // Verify the token using your secret key
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden if token is invalid
    }
    req.user = user; 
    next();
  });
};

module.exports = authenticateToken;

