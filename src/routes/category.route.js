const route = require('express').Router();
const { categoryController } = require('../controllers');
const { validateToken } = require('../middlewares');

route.post('/', validateToken, categoryController.createCategory);
route.get('/', validateToken, categoryController.getAllCategories);

module.exports = route;