import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('');

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleNotificationChange = () => {
    setNotifications(!notifications);
  };

  const handleSaveChanges = () => {
    // Logic to save settings, e.g., API call or local storage update
    alert('Settings saved successfully!');
  };

  return (
    <div className="site-content">
      <div className="settings-container">
        <h1>Settings</h1>

        {/* Profile Settings Section */}
        <div className="settings-section">
          <h2>Profile Settings</h2>
          <div className="setting-item">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="setting-item">
            <label>Old Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Old password"
            />
          </div>
          <div className="setting-item">
            <label>New Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
            />
          </div>

          <div className="setting-item">
            <button className="save-button" onClick={handleSaveChanges}>Save Changes</button>
          </div>
        </div>

        {/* App Preferences Section */}
        <div className="settings-section">
          <h2>App Preferences</h2>
          <div className="setting-item">
            <label>Theme:</label>
            <select value={theme} onChange={handleThemeChange}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="setting-item">
            <label>Notifications:</label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={handleNotificationChange}
            />
          </div>
        </div>

        {/* Privacy Settings Section */}
        <div className="settings-section">
          <h2>Privacy Settings</h2>
          <div className="setting-item">
            <label>Two-Factor Authentication:</label>
            <input type="checkbox" />
          </div>
          <div className="setting-item">
            <label>Allow Data Access:</label>
            <input type="checkbox" />
          </div>
        </div>

        {/* Account Settings Section */}
        <div className="settings-section">
          <h2>Account Settings</h2>
          <div className="setting-item">
            <button onClick={() => alert('Logged out successfully')}>Logout</button>
            <button onClick={() => alert('Account deleted permanently')}>Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
