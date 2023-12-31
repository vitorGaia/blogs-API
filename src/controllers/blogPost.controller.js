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

const updatePost = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;

  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const updatedPost = await blogPostService
  .updatePost({ title, content, userEmail: req.userEmail, postId: id });

  if (!updatedPost) return res.status(401).json({ message: 'Unauthorized user' });

  return res.status(200).json(updatedPost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { userEmail } = req;

  const deletedPost = await blogPostService.deletePost(id, userEmail);

  if (deletedPost === 'Post does not exist') return res.status(404).json({ message: deletedPost });

  if (deletedPost === 'Unauthorized user') return res.status(401).json({ message: deletedPost });

  return res.status(204).end();
};

const searchPosts = async (req, res) => {
  const { q } = req.query;
  const posts = await blogPostService.searchPosts(q);

  return res.status(200).json(posts);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPosts,
};