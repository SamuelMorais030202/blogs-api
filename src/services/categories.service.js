const { Category } = require('../models');

const createCategorie = (name) => Category.create({ name });

module.exports = {
  createCategorie,
};