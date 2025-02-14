import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';  
import axios from "../../api/axios";
import moment from 'moment';
import './Charts.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const Charts = () => {
  const [activeChart, setActiveChart] = useState('overview');
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  const authAxios = axios.create({
    baseURL: axios.baseURL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    },
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [expensesRes, incomesRes] = await Promise.all([
          authAxios.get("/transactions/expenses"),
          authAxios.get("/transactions/incomes"),
        ]);
        setExpenses(expensesRes.data);
        setIncomes(incomesRes.data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchAllData();
  }, []);

  const groupByWeek = (expenseArr, incomeArr) => {
    const grouped = {};

    expenseArr.forEach((exp) => {
      const weekKey = moment(exp.date).format('YYYY-WW');
      if (!grouped[weekKey]) {
        grouped[weekKey] = { expenses: 0, incomes: 0 };
      }

      grouped[weekKey].expenses += Math.abs(exp.amount);
    });

    incomeArr.forEach((inc) => {
      const weekKey = moment(inc.date).format('YYYY-WW');
      if (!grouped[weekKey]) {
        grouped[weekKey] = { expenses: 0, incomes: 0 };
      }
      grouped[weekKey].incomes += inc.amount;
    });

    return grouped;
  };

  const groupByMonth = (expenseArr, incomeArr) => {
    const grouped = {};

    expenseArr.forEach((exp) => {
      const monthKey = moment(exp.date).format('YYYY-MM');
      if (!grouped[monthKey]) {
        grouped[monthKey] = { expenses: 0, incomes: 0 };
      }
      grouped[monthKey].expenses += Math.abs(exp.amount);
    });

    incomeArr.forEach((inc) => {
      const monthKey = moment(inc.date).format('YYYY-MM');
      if (!grouped[monthKey]) {
        grouped[monthKey] = { expenses: 0, incomes: 0 };
      }
      grouped[monthKey].incomes += inc.amount;
    });

    return grouped;
  };

  const last4Weeks = [];
  for (let i = 3; i >= 0; i--) {
    const weekMoment = moment().subtract(i, 'weeks');
    last4Weeks.push(weekMoment.format('YYYY-WW'));
  }

  const weeklyData = groupByWeek(expenses, incomes);

  const overviewLabels = last4Weeks.map((wk) => {
    const [year, weekNum] = wk.split('-');
    return `Week ${weekNum}`;
  });

  const overviewExpenses = last4Weeks.map((wk) => weeklyData[wk]?.expenses || 0);
  const overviewIncomes = last4Weeks.map((wk) => weeklyData[wk]?.incomes || 0);

  const overviewData = {
    labels: overviewLabels,
    datasets: [
      {
        label: 'Expenses',
        data: overviewExpenses,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
      {
        label: 'Income',
        data: overviewIncomes,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Expenses vs Income (Overview)',
      },
    },
  };

  const currentWeekKey = moment().format('YYYY-WW');
  const currentWeekData = weeklyData[currentWeekKey] || { expenses: 0, incomes: 0 };

  const weekExpenses = currentWeekData.expenses;
  const weekIncomes = currentWeekData.incomes;
  const remainingIncomeWeek = Math.max(weekIncomes - weekExpenses, 0); 

  const thisWeekData = {
    labels: ['Expenses', 'Remaining Income'],
    datasets: [
      {
        label: 'This Week',
        data: [weekExpenses, remainingIncomeWeek],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const monthlyData = groupByMonth(expenses, incomes);
  const currentMonthKey = moment().format('YYYY-MM');
  const currentMonthData = monthlyData[currentMonthKey] || { expenses: 0, incomes: 0 };

  const monthExpenses = currentMonthData.expenses;
  const monthIncomes = currentMonthData.incomes;
  const remainingIncomeMonth = Math.max(monthIncomes - monthExpenses, 0);

  const thisMonthData = {
    labels: ['Expenses', 'Remaining Income'],
    datasets: [
      {
        label: 'This Month',
        data: [monthExpenses, remainingIncomeMonth],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Expenses as % of Income',
      },
      datalabels: {
        display: true,
        color: '#fff',      
        font: {
          weight: 'bold',
          size: 14,
        },

        formatter: (value, ctx) => {
          const total = ctx.dataset.data.reduce((acc, val) => acc + val, 0);
          if (!total) return '0%';
          const percentage = (value / total * 100).toFixed(0);
          return `${percentage}%`;
        },
      },
    },
    cutout: '70%', 
  };

  return (
    <div className="site-content">
      <div className="charts-container">
        <h2>Charts Section</h2>
        <p>This section displays various charts related to your financial data.</p>

        <div className="chart-navigation">
          <button onClick={() => setActiveChart('overview')}>Overview</button>
          <button onClick={() => setActiveChart('this-week')}>This Week</button>
          <button onClick={() => setActiveChart('this-month')}>This Month</button>
        </div>

        <div className="chart">
          {activeChart === 'overview' && (
            <div className="chart-section">
              <h3>Expenses vs Income (Overview)</h3>
              <Line data={overviewData} options={lineChartOptions} />
            </div>
          )}

          {activeChart === 'this-week' && (
            <div className="chart-section2">
              <h3>This Week's Expenses</h3>
              <Doughnut data={thisWeekData} options={doughnutChartOptions} />
            </div>
          )}

          {activeChart === 'this-month' && (
            <div className="chart-section2">
              <h3>This Month's Expenses</h3>
              <Doughnut data={thisMonthData} options={doughnutChartOptions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Charts;
