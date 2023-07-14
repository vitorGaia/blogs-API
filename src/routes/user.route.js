const route = require('express').Router();
const { userController } = require('../controllers');
const { validateCreateUser, validateToken } = require('../middlewares');

route.post('/', validateCreateUser, userController.createUser);
route.get('/', validateToken, userController.getAllUsers);

module.exports = route;