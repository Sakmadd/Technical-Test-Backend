// authMiddleware.js
import jwt from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Authentication failed: Token not provided' });
  }

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Authentication failed: Invalid token' });
    }

    req.user = decoded.user;
    next();
  });
};

export { authenticateUser };

