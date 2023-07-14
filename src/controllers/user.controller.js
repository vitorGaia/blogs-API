const generateToken = require('../utils/generateToken');
const { userService } = require('../services');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    await userService.createUser({ displayName, email, password, image });

    const token = generateToken(email);

    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    
    return res.status(500).json({ message: 'Internal error' });
  }
};

module.exports = {
  createUser,
};
