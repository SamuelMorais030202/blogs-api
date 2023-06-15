const { PostCategory } = require('../models');

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
};