import React from 'react';
import './Notifications.css';

const Notifications = () => {
  return (
    <div className="site-content">
      <div className="notifications-container">
        {/* Notifications Section */}
        <div className="notifications-section">
          <h2>Notifications</h2>
          <p>Here are your recent notifications:</p>

          {/* Example of notification items */}
          <div className="notification-list">
            <div className="notification-item">
              <strong>New Budget Update</strong>
              <p>You have a new budget update available for this month.</p>
              <small>2 hours ago</small>
            </div>

            <div className="notification-item">
              <strong>AI Recommendations</strong>
              <p>AI has suggested new recommendations for saving money.</p>
              <small>1 day ago</small>
            </div>

            <div className="notification-item">
              <strong>Expense Alert</strong>
              <p>You have exceeded your daily spending limit.</p>
              <small>3 days ago</small>
            </div>
          </div>

          {/* Clear Notifications Button */}
          <button className="clear-notifications">Clear All Notifications</button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
