import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./VisualisationChart.css";
import axios from "../../api/axios";
import moment from "moment";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VisualisationChart = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  const authAxios = axios.create({
    baseURL: axios.baseURL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const groupByMonthAndSum = (transactions, isExpense = false) => {
    return transactions.reduce((acc, transaction) => {

      const monthKey = moment(transaction.date).format("YYYY-MM");
      if (!acc[monthKey]) {
        acc[monthKey] = 0;
      }
      if (isExpense) {
        acc[monthKey] += Math.abs(transaction.amount);
      } else {
        acc[monthKey] += transaction.amount;
      }
      return acc;
    }, {});
  };

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

  const groupedExpenses = groupByMonthAndSum(expenses, true);
  const groupedIncomes = groupByMonthAndSum(incomes, false);

  const allMonths = Array.from(
    new Set([...Object.keys(groupedExpenses), ...Object.keys(groupedIncomes)])
  ).sort();

  const expenseData = allMonths.map((month) => groupedExpenses[month] || 0);
  const incomeData = allMonths.map((month) => groupedIncomes[month] || 0);

  const labels = allMonths.map((month) =>
    moment(month, "YYYY-MM").format("MMM YYYY")
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Expenses",
        data: expenseData,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Expenses vs. Income",
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="site-content">
      <div className="visualisation-chart-container">
        <h2>Financial Visualization</h2>
        <p>This chart shows the comparison between monthly expenses and income.</p>
        <div className="chart-wrapper">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default VisualisationChart;
