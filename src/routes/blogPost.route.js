const route = require('express').Router();
const { blogPostController } = require('../controllers');
const { validateToken } = require('../middlewares');

route.post('/', validateToken, blogPostController.createPost);
route.get('/', validateToken, blogPostController.getAllPosts);
route.get('/search', validateToken, blogPostController.searchPosts);
route.get('/:id', validateToken, blogPostController.getPostById);
route.put('/:id', validateToken, blogPostController.updatePost);
route.delete('/:id', validateToken, blogPostController.deletePost);

module.exports = route;