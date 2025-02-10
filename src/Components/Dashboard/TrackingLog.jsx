import React, { useState, useEffect } from 'react';
import moment from 'moment'; // You'll need to install this for date manipulation
import './TrackingLog.css';

const TrackingLog = () => {
  // Sample data for expenses (in real app, this could come from a backend)
  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Food', amount: 50.00, date: '2025-02-10' },
    { id: 2, category: 'Transport', amount: 30.00, date: '2025-02-09' },
    { id: 3, category: 'Entertainment', amount: 20.00, date: '2025-02-08' },
    { id: 4, category: 'Food', amount: 60.00, date: '2025-01-15' },
    { id: 5, category: 'Transport', amount: 25.00, date: '2025-01-10' },
  ]);

  const getTotalAmount = (filteredExpenses) => {
    return filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
  };

  // Group expenses by week
  const groupByWeek = (expenses) => {
    const grouped = {};
    expenses.forEach((expense) => {
      const week = moment(expense.date).week();
      if (!grouped[week]) grouped[week] = [];
      grouped[week].push(expense);
    });
    return grouped;
  };

  // Group expenses by month
  const groupByMonth = (expenses) => {
    const grouped = {};
    expenses.forEach((expense) => {
      const month = moment(expense.date).format('YYYY-MM');
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(expense);
    });
    return grouped;
  };

  // Get weekly expenses
  const weeklyExpenses = groupByWeek(expenses);

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
            <p>Total Expenses: <strong>${overallExpensesTotal}</strong></p>
          </div>
        </div>

        {/* Weekly Expenses Section */}
        <div className="tracking-log-section weekly-expenses">
          <h3>Weekly Expenses</h3>
          <div className="expenses-list">
            {Object.keys(weeklyExpenses).map((week) => (
              <div key={week} className="week-expense-item">
                <div className="week-header">
                  <h4>Week {week}</h4>
                  <p>Total for Week {week}: <strong>${getTotalAmount(weeklyExpenses[week])}</strong></p>
                </div>
                <ul className="expense-details">
                  {weeklyExpenses[week].map((expense) => (
                    <li key={expense.id}>
                      <span>{expense.category}: ${expense.amount}</span>
                      <span>on {moment(expense.date).format('MMMM Do, YYYY')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Expenses Section */}
        <div className="tracking-log-section monthly-expenses">
          <h3>Monthly Expenses</h3>
          <div className="expenses-list">
            {Object.keys(monthlyExpenses).map((month) => (
              <div key={month} className="month-expense-item">
                <div className="month-header">
                  <h4>{moment(month, 'YYYY-MM').format('MMMM YYYY')}</h4>
                  <p>Total for {moment(month, 'YYYY-MM').format('MMMM YYYY')}: <strong>${getTotalAmount(monthlyExpenses[month])}</strong></p>
                </div>
                <ul className="expense-details">
                  {monthlyExpenses[month].map((expense) => (
                    <li key={expense.id}>
                      <span>{expense.category}: ${expense.amount}</span>
                      <span>on {moment(expense.date).format('MMMM Do, YYYY')}</span>
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
