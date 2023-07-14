const { categoryService } = require('../services');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === '') return res.status(400).json({ message: '"name" is required' });

    const category = await categoryService.createCategory({ name });

    return res.status(201).json(category);
  } catch (error) {
    console.error(error);
    
    return res.status(500).json({ message: 'Internal error' });
  }
};

const getAllCategories = async (_req, res) => {
  try {
    const categories = await categoryService.getAllCategories();

    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    
    return res.status(500).json({ message: 'Internal error' });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};