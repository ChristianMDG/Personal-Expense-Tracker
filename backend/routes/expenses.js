const express = require('express');
const authenticateToken = require('../middleware/auth');
const upload = require('../middleware/upload');
const expenseController = require('../controllers/expenseController');

const router = express.Router();

router.get('/', authenticateToken, expenseController.getAllExpenses);
router.post('/', authenticateToken, upload.single('receipt'), expenseController.createExpense);
router.get('/:id', authenticateToken, expenseController.getExpenseById);
router.put('/:id', authenticateToken, upload.single('receipt'), expenseController.updateExpense);
router.delete('/:id', authenticateToken, expenseController.deleteExpense);

module.exports = router;