
const express = require('express');
const authenticateToken = require('../middleware/auth');
const incomeController = require('../controllers/incomeController');

const router = express.Router();

router.get('/', authenticateToken, incomeController.getAllIncomes);
router.post('/', authenticateToken, incomeController.createIncome);
router.get('/:id', authenticateToken, incomeController.getIncomeById);
router.put('/:id', authenticateToken, incomeController.updateIncome);
router.delete('/:id', authenticateToken, incomeController.deleteIncome);
module.exports = router;