const express = require('express');
const userController = require('../controllers/user.controller');
const { validateDisplayName, validateEmail, validatePassword } = require('../middlewares');

const router = express.Router();

router.post(
  '/',
  validateDisplayName,
  validateEmail,
  validatePassword,
  userController.createUser,
);

module.exports = router;