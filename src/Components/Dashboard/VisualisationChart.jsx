import React from 'react';
import { Bar } from 'react-chartjs-2'; // Import Bar chart from react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'; // Import necessary components from Chart.js
import './VisualisationChart.css';

// Register components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VisualisationChart = () => {
  // Data for the Bar chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'], // Months or Categories
    datasets: [
      {
        label: 'Expenses', // Label for the chart
        data: [65, 59, 80, 81, 56, 55], // Data points
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)', // Border color
        borderWidth: 1,
      },
      {
        label: 'Income', // Another dataset (e.g., Income)
        data: [45, 75, 50, 70, 90, 100],
        backgroundColor: 'rgba(153, 102, 255, 0.2)', 
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      }
    ],
  };

  // Options for customizing the chart
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Expenses vs Income',
      },
      legend: {
        position: 'top',
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
        
        {/* Chart */}
        <div className="chart-wrapper">
          <Bar data={data} options={options} /> {/* Render the Bar chart */}
        </div>
      </div>
    </div>
  );
};

export default VisualisationChart;
