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

module.exports = {
  createPost,
};