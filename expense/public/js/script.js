document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');

    const fetchExpenses = async () => {
        const response = await fetch('/expenses');
        const expenses = await response.json();
        expenseList.innerHTML = expenses.map(expense => `
            <li>
                ${expense.money} - ${expense.category} - ${expense.description}
                <button onclick="deleteExpense(${expense.id})">Delete</button>
                <button onclick="editExpense(${expense.id})">Edit</button>
            </li>
        `).join('');
    };

    const addExpense = async (event) => {
        event.preventDefault();
        const formData = new FormData(expenseForm);
        const data = {
            money: formData.get('money'),
            category: formData.get('category'),
            description: formData.get('description')
        };
        await fetch('/expenses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        expenseForm.reset();
        fetchExpenses();
    };

    const deleteExpense = async (id) => {
        await fetch(`/expenses/${id}`, { method: 'DELETE' });
        fetchExpenses();
    };

    const editExpense = (id) => {
        // You can implement an edit functionality here
    };

    expenseForm.addEventListener('submit', addExpense);
    fetchExpenses();
});
