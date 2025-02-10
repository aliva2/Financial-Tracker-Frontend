import React from 'react';
import './Preferences.css';

const Preferences = () => {
  return (
    <div className="site-content">
      <div className="preferences-container">
        {/* Preferences Section */}
        <div className="preferences-section">
          <h2>Preferences</h2>
          <p>Here you can adjust your preferences for the app.</p>

          {/* Example of user preferences form */}
          <div className="preference-options">
            <div className="preference-option">
              <label htmlFor="currency">Currency:</label>
              <select id="currency">
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="gbp">GBP</option>
                {/* Add other currency options */}
              </select>
            </div>

            <div className="preference-option">
              <label htmlFor="theme">Theme:</label>
              <select id="theme">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                {/* Add other theme options */}
              </select>
            </div>
          </div>

          <button className="save-preferences">Save Preferences</button>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
