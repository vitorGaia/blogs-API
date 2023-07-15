const { Op } = require('sequelize');
const { BlogPost, User, Category, PostCategory } = require('../models');

const createPost = async ({ title, content, categoryIds, userEmail }) => {
  const user = await User.findOne({ where: { email: userEmail }, attributes: ['id'] });
  const userId = user.id;
  const date = new Date();

  const existingCategories = await Category.findAll({ where: { id: categoryIds } });
  const existingCategoryIds = existingCategories.map((category) => category.id);
  const allCategoriesExist = categoryIds.every((categoryId) => existingCategoryIds
  .includes(categoryId));

  if (!allCategoriesExist) return false;

  const newPost = await BlogPost
  .create({ title, content, categoryIds, userId, updated: date, published: date });

  const postCategories = categoryIds.map((categoryId) => ({ postId: newPost.id, categoryId }));
  await PostCategory.bulkCreate(postCategories);

  return newPost;
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return post;
};

const updatePost = async ({ title, content, userEmail, postId }) => {
  const user = await User.findOne({ where: { email: userEmail }, attributes: ['id'] });
  const post = await getPostById(postId);
  const userId = user.id;
  const userIdPost = post.user.id;

  if (userId !== userIdPost) return false;

  await BlogPost.update({ title, content }, { where: { id: postId, userId } });

  const updatedPost = await BlogPost.findOne({
    where: { id: postId },
    include: [
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category,
        as: 'categories',
        attributes: ['id', 'name'],
        through: { attributes: [] } },
    ],
  });

  return updatedPost;
};

const deletePost = async (postId, userEmail) => {
  const user = await User.findOne({ where: { email: userEmail }, attributes: ['id'] });
  const post = await getPostById(postId);

  if (!post) return 'Post does not exist';
  
  const userId = user.id;
  const userIdPost = post.user.id;

  if (userId !== userIdPost) return 'Unauthorized user';

  await BlogPost.destroy({ where: { id: postId, userId } });

  return true;
};

const searchPosts = async (searchTerm) => {
  const posts = await BlogPost.findAll({
    where: { [Op.or]: [
      { title: { [Op.like]: `%${searchTerm}%` } },
      { content: { [Op.like]: `%${searchTerm}%` } },
    ] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPosts,
};