import React, { useState } from 'react';
import './DashboardForm.css';  
import VisualisationChart from './VisualisationChart';  // Import the chart component

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview'); 

  const handleSectionClick = (section) => {
    setActiveSection(section);  // Set active section when clicking navigation item
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="app-name">Financial Tracker</div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
        <nav>
          <ul>
            <li onClick={() => handleSectionClick('overview')}>Overview</li>
            <li onClick={() => handleSectionClick('tracking-log')}>Tracking Log</li>
            <li onClick={() => handleSectionClick('expenses')}>Expenses</li>
            <li onClick={() => handleSectionClick('ai-recommendations')}>AI Recommendations</li>
            <li onClick={() => handleSectionClick('visualisation')}>Visualisation</li> {/* Visualisation link */}
            <li onClick={() => handleSectionClick('charts')}>Charts</li>
            <li onClick={() => handleSectionClick('settings')}>Settings</li>
            <li onClick={() => handleSectionClick('preferences')}>Preferences</li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li onClick={() => handleSectionClick('notifications')}>Notifications</li>
            <li onClick={() => handleSectionClick('help')}>Help</li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Render Active Section */}
        {activeSection === 'overview' && <Overview />}
        {activeSection === 'visualisation' && <VisualisationChart />} {/* Visualisation Section */}
        {/* Add other sections like AIRecommendations, Expenses etc. here */}
      </div>
    </div>
  );
};

const Overview = () => (
  <div className="overview">
    <div className="summary-widgets">
      <div className="widget">Overview</div>
      <div className="widget">This Week</div>
      <div className="widget">This Month</div>
    </div>
    <div className="sushi-bars">
      <div className="sushi-column">
        <div className="sushi-bar small">Tracking Date</div>
        <div className="sushi-bar large">Budget Amount</div>
      </div>
      <div className="sushi-column">
        <div className="sushi-bar small">AI Recommendations</div>
        <div className="sushi-bar large">Recent Transactions</div>
      </div>
    </div>
    <div className="visualisation-chart">Visualisation Chart</div>  {/* You can replace this with Chart */}
  </div>
);

export default Dashboard;
