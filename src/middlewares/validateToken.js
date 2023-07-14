const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'lau';

const extractToken = (bearerToken) => bearerToken.split(' ')[1];

module.exports = (req, res, next) => {
  const bearerToken = req.header('Authorization');
  const token = extractToken(bearerToken);

  if (!bearerToken) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    req.userEmail = decoded.data.userEmail;

    next();
  } catch (error) {
    console.log(error);
    
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};