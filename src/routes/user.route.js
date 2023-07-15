const route = require('express').Router();
const { userController } = require('../controllers');
const { validateCreateUser, validateToken } = require('../middlewares');

route.post('/', validateCreateUser, userController.createUser);
route.get('/', validateToken, userController.getAllUsers);
route.get('/:id', validateToken, userController.getUserById);
route.delete('/me', validateToken, userController.deleteUser);

module.exports = route;