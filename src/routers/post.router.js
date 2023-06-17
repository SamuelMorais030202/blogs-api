const express = require('express');
const postController = require('../controllers/post.controller');
const { validatetoken, validatePost } = require('../middlewares');

const router = express.Router();

router.get('/search', validatetoken, postController.getBySearchTerm);
router.get('/', validatetoken, postController.getAllPosts);
router.get('/:id', validatetoken, postController.getById);
router.post('/', validatetoken, validatePost, postController.createPostCategory);
router.put('/:id', validatetoken, validatePost, postController.updateBlogPost);
router.delete('/:id', validatetoken, postController.deletBlogPost);

module.exports = router;