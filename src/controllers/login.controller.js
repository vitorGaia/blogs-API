const jwt = require('jsonwebtoken');
const { loginService } = require('../services');

const secret = process.env.JWT_SECRET || 'lau';

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginService.userLogin(req.body);

    if (!email || !password) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
    const token = jwt.sign({ data: { userEmail: email } }, secret, jwtConfig);

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal error' });
  }
};

module.exports = {
  userLogin,
};
