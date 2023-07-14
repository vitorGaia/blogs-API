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

module.exports = {
  createPost,
};