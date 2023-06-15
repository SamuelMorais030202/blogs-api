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
};