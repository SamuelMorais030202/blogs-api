const postServices = require('../services/post.service');
const categoryServices = require('../services/categories.service');
const blogPostServices = require('../services/blogPost.services');

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
const createPostCategory = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { userId } = req;

    const existCategory = await Promise
    .all(categoryIds.map((id) => categoryServices.getById(id)));

    if (!existCategory.every((id) => id !== null)) {
      return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }

    const newBlogPost = await blogPostServices.create(title, content, userId);
    const postCategory = await postServices.createPostCategory(newBlogPost.id, categoryIds);
    console.log(postCategory);

    return res.status(201).json(newBlogPost);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPostCategory,
};