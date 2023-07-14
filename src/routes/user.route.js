const route = require('express').Router();
const { userController } = require('../controllers');
const { validateCreateUser } = require('../middlewares');

route.post('/', validateCreateUser, userController.createUser);

module.exports = route;