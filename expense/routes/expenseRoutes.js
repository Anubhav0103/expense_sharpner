const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.get('/', expenseController.getExpenses);
router.post('/', expenseController.postExpense);
router.delete('/:id', expenseController.deleteExpense);
router.put('/', expenseController.updateExpense);

module.exports = router;
