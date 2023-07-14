const route = require('express').Router();
const { blogPostController } = require('../controllers');
const { validateToken } = require('../middlewares');

route.post('/', validateToken, blogPostController.createPost);

module.exports = route;