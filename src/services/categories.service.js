const { Category } = require('../models');

const getAllCategories = () => Category.findAll();

const createCategorie = (name) => Category.create({ name });

module.exports = {
  createCategorie,
  getAllCategories,
};