import React, { useState, useEffect } from "react";
import moment from "moment"; // You'll need to install this for date manipulation
import "./TrackingLog.css";
import axios from "../../api/axios";

const TrackingLog = () => {
  // Sample data for expenses (in real app, this could come from a backend)
  const [expenses, setExpenses] = useState([]);

  const getTotalAmount = (filteredExpenses) => {
    return filteredExpenses.reduce((total, expense) => total + expense.amount * -1, 0);
  };

  const authAxios = axios.create({
    baseURL: axios.baseURL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  useEffect(() => {
    const fetchMonthly = async () => {
      try {
        const response = await authAxios.get("/transactions/expenses/monthly");
        setExpenses(response.data); // Assume the API returns an array of categories
      } catch (error) {
        console.error("Error fetching expensess", error);
      }
    };

    fetchMonthly();
  }, []);

  // Group expenses by month
  const groupByMonth = (expenses) => {
    const grouped = {};
    expenses.forEach((expense) => {
      const month = moment(expense.date).format("YYYY-MM");
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(expense);
    });
    return grouped;
  };

  // Get weekly expenses
  // const weeklyExpenses = groupByWeek(expenses);

  // Get monthly expenses
  const monthlyExpenses = groupByMonth(expenses);

  // Calculate overall expenses
  const overallExpensesTotal = getTotalAmount(expenses);

  return (
    <div className="tracking-log-wrapper">
      <div className="tracking-log-container">
        <div className="tracking-log-header">
          <h2>Tracking Log</h2>
        </div>

        {/* Overall Expenses Section */}
        <div className="tracking-log-section overall-expenses">
          <h3>Overall Expenses</h3>
          <div className="expense-summary">
            <p>
              Total Expenses: <strong>${overallExpensesTotal}</strong>
            </p>
          </div>
        </div>

        {/* Monthly Expenses Section */}
        <div className="tracking-log-section monthly-expenses">
          <h3>Monthly Expenses</h3>
          <div className="expenses-list">
            {Object.keys(monthlyExpenses).map((month) => (
              <div key={month} className="month-expense-item">
                <div className="month-header">
                  <h4>{moment(month, "YYYY-MM").format("MMMM YYYY")}</h4>
                  <p>
                    Total for {moment(month, "YYYY-MM").format("MMMM YYYY")}: <strong>$ {getTotalAmount(monthlyExpenses[month])}</strong>
                  </p>
                </div>
                <ul className="expense-details">
                  {monthlyExpenses[month].map((expense) => (
                    <li key={expense.id}>
                      <span>
                        {expense.category}: $ {expense.amount * -1}
                      </span>
                      <span>on {moment(expense.date).format("MMMM Do, YYYY")}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingLog;
