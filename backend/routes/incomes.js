// const express = require('express')
// const incomeController=require('../controllers/incomeController')
// const { updateExpense } = require('../controllers/expenseController')

// const router = express.Router()
// //route pour recuperer tous les incomes
// router.get('/',incomeController.getAllIncomes)

// //route pour recuperer une imcome par son Id
// router.get("/:id",incomeController.getIncomeById)

// //route pour poster une income
// router.post('/',incomeController.createIncome)

// //route pour uptade des incomes
// router.put('/:id',incomeController.updateIncome)

// //route pour effacer un income

// router.delete('/:id',incomeController.deleteIncome)


// module.exports = router 


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