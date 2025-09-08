const express = require('express');
const authenticateToken = require('../middleware/auth');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/', authenticateToken, categoryController.getAllCategories);
router.post('/', authenticateToken, categoryController.createCategory);
router.put('/:id', authenticateToken, categoryController.updateCategory);
router.delete('/:id', authenticateToken, categoryController.deleteCategory);

module.exports = router;