const route = require('express').Router();
const { blogPostController } = require('../controllers');
const { validateToken } = require('../middlewares');

route.post('/', validateToken, blogPostController.createPost);
route.get('/', validateToken, blogPostController.getAllPosts);
route.get('/:id', validateToken, blogPostController.getPostById);

module.exports = route;