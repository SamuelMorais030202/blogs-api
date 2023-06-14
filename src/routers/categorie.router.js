const express = require('express');
const categoriesController = require('../controllers/categories.controller');
const { validatetoken } = require('../middlewares');

const router = express.Router();

router.get('/', validatetoken, categoriesController.getAllCategories);
router.post('/', validatetoken, categoriesController.createCategorie);

module.exports = router;