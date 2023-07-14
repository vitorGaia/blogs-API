const { User } = require('../models');

const userLogin = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, password } });
  return user;
};

module.exports = {
  userLogin,
};