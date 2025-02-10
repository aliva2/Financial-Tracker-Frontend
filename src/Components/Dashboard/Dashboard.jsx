import React, { useState, useEffect, useRef } from 'react';
import './DashboardForm.css';  
import VisualisationChart from './VisualisationChart';  // Import the chart component
import Overview from "./Overview";
import Expenses from "./Expenses";
import AIRecommendations from "./AIRecommendations";
import TrackingLog from "./TrackingLog";
import Charts from "./Charts";
import Settings from "./Settings";
import Preferences from "./Preferences";
import Notifications from "./Notifications"; 
import Help from "./Help";
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa"; // Import user profile ico
import { LiaMoneyCheckAltSolid } from 'react-icons/lia'; // Import the Money Check icon
import './Footer.css';
import './Profile.css';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview'); 
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false); // State to manage the profile menu
  const navigate = useNavigate();
  const profileRef = useRef(null); 

  const handleSectionClick = (section) => {
    setActiveSection(section);  // Set active section when clicking navigation item
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen); // Toggle the profile dropdown menu
  };

  const handleLogout = () => {
    // Implement logout logic here, e.g., clearing session or redirecting to login page
    console.log('Logging out...');
  };

  // Close the profile menu if the user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false); // Close the menu if click is outside
      }
    };
      // Add event listener to document when component mounts
      document.addEventListener('click', handleClickOutside);

      // Cleanup event listener when component unmounts
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
  }, []);
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="app-name">
          <span>Financial Tracker</span>
          <LiaMoneyCheckAltSolid /> {/* Money check icon */}
        </div>
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

      {/* Profile Section in Top-right */}
      <div className="profile-section">
        <div className="profile-info" onClick={toggleProfileMenu}>
          <FaUserCircle className="profile-icon" /> {/* Profile icon from React Icons */}
          <span className="profile-name">John Doe</span> {/* Display user name */}
        </div>

        {/* Profile Dropdown */}
        {isProfileMenuOpen && (
          <div className="profile-dropdown">
            <ul>
              <li>
                <a href="#view-profile" onClick={() => handleSectionClick('settings')}>
                  View Profile
                </a>
              </li>
              <li><a href="#logout" onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        )}
      </div>


        {/* Active Section Content */}
        {activeSection === 'overview' && <Overview />}
        {activeSection === 'tracking-log' && <TrackingLog />}
        {activeSection === 'expenses' && <Expenses />}
        {activeSection === 'ai-recommendations' && <AIRecommendations />}
        {activeSection === 'visualisation' && <VisualisationChart />}
        {activeSection === 'charts' && <Charts />}
        {activeSection === 'settings' && <Settings />}
        {activeSection === 'preferences' && <Preferences />}
          {/* Add Notifications and Help here */}
        {activeSection === 'notifications' && <Notifications />}
        {activeSection === 'help' && <Help />}


        {/* Footer Section */}
        <div className='site'>
          <footer className="footer">
            <div className="footer-column about">
              <p><strong>About Financial Tracker:</strong></p>
              <p>
                Financial Tracker with AI-driven insights. 
                Stay on top of your finances with real-time data visualization and tracking.
              </p>
            </div>

            <div className="footer-column social-links">
              <p><strong>Follow Us:</strong></p>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>

            <div className="footer-column contact-info">
              <p><strong>Contact Us:</strong></p>
              <p>Email: support@financialtracker.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </footer>
        </div> 

      </div>
    </div>
  );
};

export default Dashboard;
