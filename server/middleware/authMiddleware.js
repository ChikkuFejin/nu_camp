const jwt = require('jsonwebtoken');

const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
  try {
    // Get the JWT token from the request header
    const token = req.headers.authorization?.split(' ')[1];
    console.log("🚀 ~ file: authMiddleware.js:9 ~ authMiddleware ~ token", token)

    if (!token) {
      return res.status(401).json({ error: 'Authentication failed. No token provided.' });
    }

    // Verify the token and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in the database and attach to the request object
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed. User not found.' });
    }
    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Authentication failed.' });
  }
};

module.exports = authMiddleware;