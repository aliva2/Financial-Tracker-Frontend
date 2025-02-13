import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';  // Import the data labels plugin
import './Charts.css';


// Register Chart.js components and the datalabels plugin
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, ChartDataLabels);


const Charts = () => {
  const [activeChart, setActiveChart] = useState('overview');


  // Mock data for expenses and income
  const overviewData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Time periods
    datasets: [
      {
        label: 'Expenses',
        data: [500, 600, 700, 800], // Example expenses
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
      {
        label: 'Income',
        data: [1000, 1200, 1100, 1300], // Example income
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  };


  // Mock data for this week
  const thisWeekData = {
    labels: ['Expenses', 'Remaining Income'],
    datasets: [
      {
        label: 'This Week',
        data: [70, 30],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };


  // Mock data for this month
  const thisMonthData = {
    labels: ['Expenses', 'Remaining Income'],
    datasets: [
      {
        label: 'This Month',
        data: [75, 25],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };


  // Chart options
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
      // Add the datalabels plugin configuration
      datalabels: {
        display: true,
        color: '#fff', // White color for the labels
        font: {
          weight: 'bold',
          size: 14,
        },
        formatter: (value) => `${value}%`, // Show percentage
      },
    },
    cutout: '70%', // This will make the doughnut circle smaller
  };


  return (
    <div className="site-content">
      <div className="charts-container">
        <h2>Charts Section</h2>
        <p>This section displays various charts related to your financial data.</p>


        {/* Chart Navigation */}
        <div className="chart-navigation">
          <button onClick={() => setActiveChart('overview')}>Overview</button>
          <button onClick={() => setActiveChart('this-week')}>This Week</button>
          <button onClick={() => setActiveChart('this-month')}>This Month</button>
        </div>


        {/* Chart Content */}
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
