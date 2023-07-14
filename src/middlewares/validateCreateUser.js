const { loginService } = require('../services');

const validateCreateUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const user = await loginService.userLogin({ email, password });

  if (user) {
    return res.status(409).json({ message: 'User already registered' });
  }
  
  if (displayName.length < 8) {
    return res.status(400)
    .json({ message: '"displayName" length must be at least 8 characters long' });
  }

  if (!regexEmail.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  if (password.length < 6) {
    return res.status(400)
    .json({ message: '"password" length must be at least 6 characters long' });
  }

  next();
};

module.exports = validateCreateUser;