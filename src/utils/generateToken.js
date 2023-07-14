const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'lau';

module.exports = (email) => {
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  return jwt.sign({ data: { userEmail: email } }, secret, jwtConfig);
};