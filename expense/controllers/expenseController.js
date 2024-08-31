const Expense = require('../models/expense');

exports.getExpenses = (req, res) => {
    Expense.getAllExpenses(expenses => {
        res.json(expenses);
    });
};

exports.postExpense = (req, res) => {
    const { money, category, description } = req.body;
    Expense.createExpense(money, category, description, result => {
        res.status(201).json({ message: 'Expense created!', expenseId: result.insertId });
    });
};

exports.deleteExpense = (req, res) => {
    const id = req.params.id;
    Expense.deleteExpense(id, result => {
        res.json({ message: 'Expense deleted!' });
    });
};

exports.updateExpense = (req, res) => {
    const { id, money, category, description } = req.body;
    Expense.updateExpense(id, money, category, description, result => {
        res.json({ message: 'Expense updated!' });
    });
};
