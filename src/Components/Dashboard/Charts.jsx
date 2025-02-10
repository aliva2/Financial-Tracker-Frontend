import React, { useState } from 'react';
import './Charts.css';

const Charts = () => {
  const [activeChart, setActiveChart] = useState('overview');

  const handleChartChange = (chart) => {
    setActiveChart(chart); // Change the chart based on the user's selection
  };

  return (
    <div className="site-content">
      <div className="charts-container">
        <h2>Charts Section</h2>
        <p>This section will display various charts related to your financial data.</p>

        {/* Chart Navigation */}
        <div className="chart-navigation">
          <button onClick={() => handleChartChange('overview')}>Overview</button>
          <button onClick={() => handleChartChange('this-week')}>This Week</button>
          <button onClick={() => handleChartChange('this-month')}>This Month</button>
        </div>

        {/* Chart Content */}
        <div className="chart">
          {activeChart === 'overview' && (
            <div className="chart-section">
              <h3>Overview Chart</h3>
              <p>This chart shows a general overview of your financial status.</p>
              {/* Placeholder for chart */}
              <div className="chart-placeholder">Graph for Overview will appear here.</div>
            </div>
          )}

          {activeChart === 'this-week' && (
            <div className="chart-section">
              <h3>This Week's Chart</h3>
              <p>This chart displays your financial data for the current week.</p>
              {/* Placeholder for chart */}
              <div className="chart-placeholder">Graph for This Week will appear here.</div>
            </div>
          )}

          {activeChart === 'this-month' && (
            <div className="chart-section">
              <h3>This Month's Chart</h3>
              <p>This chart shows your financial data for the current month.</p>
              {/* Placeholder for chart */}
              <div className="chart-placeholder">Graph for This Month will appear here.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Charts;
