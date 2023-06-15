const { Category } = require('../models');

const getAllCategories = () => Category.findAll();

const createCategorie = (name) => Category.create({ name });

const getById = (id) => Category.findByPk(id);

module.exports = {
  createCategorie,
  getAllCategories,
  getById,
};