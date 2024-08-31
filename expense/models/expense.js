const mysql = require('mysql2');
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'expense_management',
    password: 'yourpassword'
});

module.exports = {
    createExpense: (money, category, description, callback) => {
        db.query(
            'INSERT INTO expenses (money, category, description) VALUES (?, ?, ?)',
            [money, category, description],
            (err, results) => {
                if (err) throw err;
                callback(results);
            }
        );
    },
    getAllExpenses: (callback) => {
        db.query('SELECT * FROM expenses', (err, results) => {
            if (err) throw err;
            callback(results);
        });
    },
    deleteExpense: (id, callback) => {
        db.query('DELETE FROM expenses WHERE id = ?', [id], (err, results) => {
            if (err) throw err;
            callback(results);
        });
    },
    updateExpense: (id, money, category, description, callback) => {
        db.query(
            'UPDATE expenses SET money = ?, category = ?, description = ? WHERE id = ?',
            [money, category, description, id],
            (err, results) => {
                if (err) throw err;
                callback(results);
            }
        );
    }
};
