import React from 'react';
import './Overview.css';

// Mock data for the widgets and visualizations
const mockData = {
  weekProgress: 50,  // 50% completion for this week
  monthProgress: 75, // 75% completion for this month
  overviewProgress: 30, // 30% completion for the overall budget or progress
};

const Overview = () => {
  return (
    <div className="overview">
      {/* Summary Widgets Section */}
      <section className="summary-widgets">
        <div className="widget">
          <h3>Overview</h3>
          <div 
            className="circle doughnut"
            style={{
              background: `conic-gradient(#4CAF50 ${mockData.overviewProgress}%, #ddd ${mockData.overviewProgress}% 100%)`
            }}>
            <span className="percentage">{mockData.overviewProgress}%</span>
          </div>
        </div>
        <div className="widget">
          <h3>This Week</h3>
          <div 
            className="circle doughnut"
            style={{
              background: `conic-gradient(#FFC107 ${mockData.weekProgress}%, #ddd ${mockData.weekProgress}% 100%)`
            }}>
            <span className="percentage">{mockData.weekProgress}%</span>
          </div>
        </div>
        <div className="widget">
          <h3>This Month</h3>
          <div 
            className="circle doughnut"
            style={{
              background: `conic-gradient(#2196F3 ${mockData.monthProgress}%, #ddd ${mockData.monthProgress}% 100%)`
            }}>
            <span className="percentage">{mockData.monthProgress}%</span>
          </div>
        </div>
      </section>

      {/* Sushi Bars Section (visualizations or budget tracker) */}
      <section className="sushi-bars">
        <div className="sushi-column">
          <div className="sushi-bar small">Tracking Date</div>
          <div className="sushi-bar large">Budget Amount</div>
        </div>
        <div className="sushi-column">
          <div className="sushi-bar small">AI Recommendations</div>
          <div className="sushi-bar large">Recent Transactions</div>
        </div>
      </section>

      {/* Visualisation Chart */}
      <section className="visualisation-chart">
        <p>Visualisation Chart</p> {/* Replace with actual chart component or content */}
      </section>
    </div>
  );
};

export default Overview;
