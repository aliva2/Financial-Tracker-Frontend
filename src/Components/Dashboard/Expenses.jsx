import React, { useState, useEffect } from "react";
import axios from "../../api/axios"; // You'll need axios or any other library to make API requests
import "./Expenses.css";
const Expenses = () => {
  // State for managing categories, expenses, and form inputs
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState({
    id: "",
    title: "",
  });
  const [date, setDate] = useState();

  const authAxios = axios.create({
    baseURL: axios.baseURL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  // Fetch categories from the database when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await authAxios.get("/categories/all");
        setCategories(response.data); // Assume the API returns an array of categories
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    const fetchExpenses = async () => {
      try {
        const response = await authAxios.get("/transactions/expenses");
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses", error);
      }
    };

    fetchCategories();
    fetchExpenses();
  }, []);

  // Handle form submission (adding expense)
  const handleSubmit = async () => {
    try {
      await authAxios.post("/transactions/add", {
        amount: parseFloat(amount),
        description: description,
        categoryId: category.id,
        date: date,
        transactionType: 1,
      });
      fetchExpenses();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await authAxios.delete(`/transactions/delete/${id}`);

      const fetchExpenses = async () => {
        try {
          const response = await authAxios.get("/transactions/expenses");
          setExpenses(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await authAxios.get("/transactions/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
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
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.category}</td>
                    <td>${expense.amount * -1}</td>
                    <td>{expense.date}</td>
                    <td>
                      <button onClick={() => deleteExpense(expense.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add New Expense Form */}
          <div className="add-expense">
            <h3>Add New Expense</h3>

            {/* Category Dropdown */}
            <select name="category" value={category.id ? category.id : ""} onChange={(e) => setCategory({ id: e.target.value, name: e.target.options[e.target.selectedIndex].text })}>
              <option value="" defaultChecked>
                Select Category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
              required
            </select>

            <input type="number" name="amount" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />

            <input type="text" name="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />

            <input type="date" name="date" onChange={(e) => setDate(e.target.value)} />

            <button onClick={handleSubmit}>Add Expense</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
