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

const getAllUsers = async (_req, res) => {
  try {
    const users = await userService.getAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    
    return res.status(500).json({ message: 'Internal error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);

    if (!user) return res.status(404).json({ message: 'User does not exist' });

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: 'Internal error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userEmail } = req;

    await userService.deleteUser(userEmail);

    return res.status(204).end();
  } catch (error) {
    console.error(error);
    
    return res.status(500).json({ message: 'Internal error' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
