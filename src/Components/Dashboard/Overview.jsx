import React, { useState, useEffect } from "react";
import "./Overview.css"; // Import the CSS file
import axios from "../../api/axios"; // You'll need axios or any other library to make API requests
import VisualisationChart from "./VisualisationChart";
import AIRecommendations from "./AIRecommendations";
import { format, isToday, isYesterday, parseISO } from "date-fns";

const FinanceOverview = () => {
  const [expenses, setExpenses] = useState([]);
  const [spent, setSpent] = useState();
  const [income, setIncome] = useState();
  const [categories, setCategories] = useState([]);
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

  const spentPercentage = (((spent * -1) / income) * 100).toFixed(1);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await authAxios.get("/transactions/expenses");
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses", error);
      }
    };

    const fetchMonthExpenses = async () => {
      try {
        const response = await authAxios.get("/transactions/expenses/monthly/total");
        setSpent(response.data);
      } catch (error) {
        console.error("Error fetching expenses", error);
      }
    };

    const fetchTotalIncome = async () => {
      try {
        const response = await authAxios.get("/transactions/incomes/monthly/total");
        setIncome(response.data);
      } catch (error) {
        console.error("Error fetching expenses", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await authAxios.get("/categories/all");
        setCategories(response.data); // Assume the API returns an array of categories
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchExpenses();
    fetchMonthExpenses();
    fetchTotalIncome();
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      console.log({ amount, description, category, date });
      await authAxios.post("/transactions/add", {
        amount: parseFloat(amount),
        description: description,
        categoryId: category.id,
        date: date,
        transactionType: 1,
      });
      fetchMonthExpenses();
      fetchTotalIncome();
      fetchExpenses();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const fetchTotalIncome = async () => {
    try {
      const response = await authAxios.get("/transactions/incomes/monthly/total");
      setIncome(response.data);
    } catch (error) {
      console.error("Error fetching expenses", error);
    }
  };

  const fetchMonthExpenses = async () => {
    try {
      const response = await authAxios.get("/transactions/expenses/monthly/total");
      setSpent(response.data);
    } catch (error) {
      console.error("Error fetching expenses", error);
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

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "dd-MM-yyyy");
  };

  const groupedExpenses = expenses.reduce((acc, expense) => {
    const key = expense.date;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(expense);
    return acc;
  }, {});

  return (
    <div className="finance-container">
      <div className="grid-container">
        {/* Income vs Spent Card */}
        <div className="card">
          <h3>February 2025</h3>
          <div className="pie-chart">
            <div className="circle">
              <div className="filled" style={{ "--percent": spentPercentage }}></div>
              <div className="overlay">{spentPercentage}%</div>
            </div>
          </div>
          <p>
            <strong>Income:</strong> ${income}
          </p>
          <p>
            <strong>Spent:</strong> ${spent * -1}
          </p>
        </div>

        {/* Expense Form */}
        <div className="card form-card">
          <select
            name="category"
            value={category.id ? category.id : ""}
            onChange={(e) => {
              const selectedIndex = e.target.selectedIndex;
              const selectedCategory = {
                id: e.target.value,
                title: e.target.options[selectedIndex].text,
              };
              setCategory(selectedCategory);
            }}
          >
            <option>Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>
          <input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
          <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
          {/* <input type="date" onChange={(e) => setDate(e.target.value)} /> */}
          <button onClick={handleSubmit}>Add Expense</button>
        </div>

        {/* Tracking and AI Recommendations */}
        <div className="info-box">
          <section className="recommend">
            <AIRecommendations />
          </section>
        </div>

        {/* Recommendations List */}
        <div className="recently-spent">
          {/* <ul>
            {expenses.slice(0, 5).map((expense, index) => (
              <li key={index}>
                {expense.date} spent ${expense.amount * -1} on {expense.category.toLowerCase()}
              </li>
            ))}
          </ul> */}
          {Object.keys(groupedExpenses)
            .map((date) => ({
              date,
              transactions: groupedExpenses[date],
            }))
            .slice(0, 10)
            .map(({ date, transactions }) => (
              <div key={date} className="mb-4">
                <h3 className="text-lg font-bold">{formatDate(date)}</h3>
                <ul className="pl-4">
                  {transactions.map((txn, index) => (
                    <li key={index} className="text-gray-700">
                      ${txn.amount * -1} on {txn.category.toLowerCase()}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>

      {/* Visualization Chart Placeholder */}
      <section className="visualisation-chart">
        <VisualisationChart />
      </section>
    </div>
  );
};

export default FinanceOverview;
