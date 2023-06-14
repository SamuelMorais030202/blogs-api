const express = require('express');
const userController = require('../controllers/user.controller');

const {
  validateDisplayName,
  validateEmail,
  validatePassword,
  validatetoken,
} = require('../middlewares');

const router = express.Router();

router.get('/', validatetoken, userController.getAllUsers);

router.get('/:id', validatetoken, userController.getById);

router.post(
  '/',
  validateDisplayName,
  validateEmail,
  validatePassword,
  userController.createUser,
);

module.exports = router;