const { Op } = require('sequelize');
const { PostCategory, User, BlogPost, Category } = require('../models');

const getAllPosts = async () => {
  const allList = BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      { 
        model: Category,
        as: 'categories',
        attributes: { 
          exclude: ['PostCategory'],
        },
        through: { attributes: [] },
     },
    ],
  });

  return allList;
};

const getBySearchTerm = async (q) => BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `${q}` } },
        { content: { [Op.like]: `${q}` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category,
        as: 'categories',
        attributes: { 
          exclude: ['PostCategory'],
        },
        through: { attributes: [] },
      },
    ],
  });

const getById = async (id) => {
  const post = BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      {
        model: Category,
        as: 'categories',
        attributes: { 
          exclude: ['PostCategory'],
        },
        through: { attributes: [] },
      },
    ],
  });

  return post;
};

const createPostCategory = (postId, categoryIds) => {
  const list = categoryIds.map((category) => ({
    postId,
    categoryId: category,
  }));
  const newPostCategory = PostCategory.bulkCreate(list);
  return newPostCategory;
};

module.exports = {
  createPostCategory,
  getAllPosts,
  getById,
  getBySearchTerm,
};