const route = require('express').Router();
const { categoryController } = require('../controllers');
const { validateToken } = require('../middlewares');

route.post('/', validateToken, categoryController.createCategory);

module.exports = route;