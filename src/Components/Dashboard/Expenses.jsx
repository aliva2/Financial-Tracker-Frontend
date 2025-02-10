import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You'll need axios or any other library to make API requests
import './Expenses.css';
const Expenses = () => {
  // State for managing categories, expenses, and form inputs
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Food', amount: 50.00, date: '2025-02-10' },
    { id: 2, category: 'Transport', amount: 30.00, date: '2025-02-09' },
    { id: 3, category: 'Entertainment', amount: 20.00, date: '2025-02-08' },
  ]);
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: '',
    date: ''
  });

  // Fetch categories from the database when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://your-api-endpoint.com/categories');
        setCategories(response.data); // Assume the API returns an array of categories
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({
      ...newExpense,
      [name]: value
    });
  };

  // Handle form submission (adding expense)
  const handleSubmit = () => {
    if (newExpense.category && newExpense.amount && newExpense.date) {
      setExpenses([
        ...expenses,
        { ...newExpense, id: expenses.length + 1 }
      ]);
      setNewExpense({ category: '', amount: '', date: '' }); // Reset form
    }
  };

  return (
    <div className="site-content">
      <div className="expenses-container">
        <div className="expenses">
          <h2>Your Expenses</h2>

          {/* Expense List */}
          <div className="expenses-list">
            <h3>Current Expenses</h3>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.category}</td>
                    <td>${expense.amount}</td>
                    <td>{expense.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add New Expense Form */}
          <div className="add-expense">
            <h3>Add New Expense</h3>

            {/* Category Dropdown */}
            <select
              name="category"
              value={newExpense.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={handleChange}
            />

            <input
              type="date"
              name="date"
              value={newExpense.date}
              onChange={handleChange}
            />

            <button onClick={handleSubmit}>Add Expense</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
