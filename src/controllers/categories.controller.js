const categoriesServices = require('../services/categories.service');

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const getAllCategories = async (req, res) => {
  try {
    const allCategories = await categoriesServices.getAllCategories();

    return res.status(200).json(allCategories);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
const createCategorie = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: '"name" is required' });
    }

    const newCategorie = await categoriesServices.createCategorie(name);

    return res.status(201).json(newCategorie);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCategorie,
  getAllCategories,
};