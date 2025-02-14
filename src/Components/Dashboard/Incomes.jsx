import React, { useState, useEffect } from "react";
import axios from "../../api/axios"; // You'll need axios or any other library to make API requests
import "./Incomes.css";
import { setIn } from "formik";
const Incomes = () => {
  // State for managing incomes, and form inputs
  // const [categories, setCategories] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();

  const authAxios = axios.create({
    baseURL: axios.baseURL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  // Fetch categories from the database when the component mounts
  useEffect(() => {
    // const fetchCategories = async () => {
    //   try {
    //     const response = await authAxios.get("/categories/all");
    //     setCategories(response.data); // Assume the API returns an array of categories
    //   } catch (error) {
    //     console.error("Error fetching categories", error);
    //   }
    // };

    const fetchIncomes = async () => {
      try {
        const response = await authAxios.get("/transactions/incomes");
        setIncomes(response.data);
      } catch (error) {
        console.error("Error fetching incomes", error);
      }
    };

    // fetchCategories();
    fetchIncomes();
  }, []);

  // Handle form submission (adding income)
  const handleSubmit = async () => {
    try {
      await authAxios.post("/transactions/add", {
        amount: parseFloat(amount),
        description: description,
        // categoryId: category.id,
        date: date,
        transactionType: 0,
      });
      fetchIncomes();
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };

  const deleteIncome = async (id) => {
    try {
      await authAxios.delete(`/transactions/delete/${id}`);

      const fetchIncomes = async () => {
        try {
          const response = await authAxios.get("/transactions/incomes");
          setIncomes(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchIncomes();
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  const fetchIncomes = async () => {
    try {
      const response = await authAxios.get("/transactions/incomes");
      setIncomes(response.data);
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };

  return (
    <div className="site-content">
      <div className="expenses-container">
        <div className="expenses">
          <h2>Your Incomes</h2>

          {/* Income List */}
          <div className="expenses-list">
            <h3>Current Incomes</h3>
            <table>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {incomes.map((income) => (
                  <tr key={income.id}>
                    {/* <td>{income.category}</td> */}
                    <td>${income.amount}</td>
                    <td>{income.date}</td>
                    <td>
                      <button onClick={() => deleteIncome(income.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add New Income Form */}
          <div className="add-expense">
            <h3>Add New Income</h3>

            {/* Category Dropdown */}
            {/* <select name="category" value={category.id ? category.id : ""} onChange={(e) => setCategory({ id: e.target.value, name: e.target.options[e.target.selectedIndex].text })}>
              <option value="" defaultChecked>
                Select Category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
              required
            </select> */}

            <input type="number" name="amount" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />

            <input type="text" name="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />

            <input type="date" name="date" onChange={(e) => setDate(e.target.value)} />

            <button onClick={handleSubmit}>Add Income</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Incomes;
