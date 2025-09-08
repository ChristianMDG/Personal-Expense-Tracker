const express = require('express');
const upload = require('../middleware/upload');
const expenseController = require('../controllers/expenseController');

const router = express.Router();

router.get('/',  expenseController.getAllExpenses);
router.post('/',  upload.single('receipt'), expenseController.createExpense);
router.get('/:id',  expenseController.getExpenseById);
router.put('/:id',  upload.single('receipt'), expenseController.updateExpense);
router.delete('/:id',  expenseController.deleteExpense);

module.exports = router;