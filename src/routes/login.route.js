const route = require('express').Router();
const { loginController } = require('../controllers');

route.post('/', loginController.userLogin);

module.exports = route;