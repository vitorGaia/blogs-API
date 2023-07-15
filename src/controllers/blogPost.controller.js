const { blogPostService } = require('../services');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const test = Object.values(req.body).some((value) => value.length !== 0);

  if (!test) return res.status(400).json({ message: 'Some required fields are missing' });

  const newPost = await blogPostService
  .createPost({ title, content, categoryIds, userEmail: req.userEmail });

  if (!newPost) return res.status(400).json({ message: 'one or more "categoryIds" not found' });

  return res.status(201).json(newPost);
};

const getAllPosts = async (_req, res) => {
  const posts = await blogPostService.getAllPosts();

  return res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await blogPostService.getPostById(id);

  if (!post) return res.status(404).json({ message: 'Post does not exist' });

  return res.status(200).json(post);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
};