const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secretJWT';

module.exports = (req, res, next) => {
  try {
    const token = req.header('Authorization');
  
    if (!token) return res.status(401).json({ message: 'Token not found' });
  
    const { data } = jwt.verify(token, secret);

    req.userId = data.userId;
  
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};