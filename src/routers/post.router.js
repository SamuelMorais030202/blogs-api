const express = require('express');
const postController = require('../controllers/post.controller');
const { validatetoken, validatePost } = require('../middlewares');

const router = express.Router();

router.post('/', validatetoken, validatePost, postController.createPostCategory);

module.exports = router;