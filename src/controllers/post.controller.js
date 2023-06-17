const postServices = require('../services/post.service');
const categoryServices = require('../services/categories.service');
const blogPostServices = require('../services/blogPost.services');

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const getAllPosts = async (_req, res) => {
  try {
    const allPosts = await postServices.getAllPosts();
    return res.status(200).json(allPosts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const postId = await postServices.getById(id);

    if (!postId) {
      return res.status(404).json({ message: 'Post does not exist' });
    }

    return res.status(200).json(postId);
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

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const updateBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    const { userId } = req;

    const validate = await postServices.getById(id);

    if (userId !== validate.userId) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    await blogPostServices.updateBlogPost(title, content, id);
    const newBlogPost = await postServices.getById(id);

    return res.status(200).json(newBlogPost);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPostCategory,
  getAllPosts,
  getById,
  updateBlogPost,
};