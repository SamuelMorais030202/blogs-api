const express = require('express');
const postController = require('../controllers/post.controller');
const { validatetoken, validatePost } = require('../middlewares');

const router = express.Router();

router.get('/', validatetoken, postController.getAllPosts);
router.post('/', validatetoken, validatePost, postController.createPostCategory);

module.exports = router;