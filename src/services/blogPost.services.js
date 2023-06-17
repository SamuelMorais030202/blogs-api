const { BlogPost } = require('../models');

const create = (title, content, id) => {
  const data = new Date();
  const format = data.toISOString();

  const published = format;
  const updated = format;
  const userId = Number(id);

  const newBlogPost = BlogPost.create({ title, content, userId, updated, published });

  return newBlogPost;
};

const updateBlogPost = async (title, content, id) => {
  const date = new Date();
  const update = date.toISOString();

  const [updateBlog] = await BlogPost
  .update({ title, content, update }, { where: { id } });

  return updateBlog;
};

const deletBlogPost = async (id) => {
  const deleteBlog = await BlogPost.destroy(
    { where: { id } },
  );

  return deleteBlog;
};

module.exports = {
  create,
  updateBlogPost,
  deletBlogPost,
};