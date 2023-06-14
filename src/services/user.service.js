const { User } = require('../models');

// Funções
const getAll = () => User.findAll({ exclude: { model: User.password } });

const getById = (id) => User.findByPk(id);

const getByEmail = (email) => User.findOne({ where: { email } });

const createUser = ({ displayName, email, password, image }) => User
  .create({ displayName, email, password, image });

module.exports = {
  getAll,
  getById,
  getByEmail,
  createUser,
};