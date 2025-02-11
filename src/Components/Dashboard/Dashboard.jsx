import React, { useState } from "react";
import "./DashboardForm.css";
import VisualisationChart from "./VisualisationChart"; // Import the chart component
import Overview from "./Overview";
import Expenses from "./Expenses";
import AIRecommendations from "./AIRecommendations";
import TrackingLog from "./TrackingLog";
import Charts from "./Charts";
import Settings from "./Settings";
import Preferences from "./Preferences";
import Notifications from "./Notifications";
import Help from "./Help";
import { LiaMoneyCheckAltSolid } from "react-icons/lia"; // Import the Money Check icon
import "./Footer.css";
import "./Profile.css";
import Footer from "./Footer";
import Profile from "./Profile";
import Search from "./Search";
import Categories from "./Categories";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { setAuth } = useAuth();

  const [activeSection, setActiveSection] = useState("overview");
  const [searchQuery, setSearchQuery] = useState(""); // Add state to manage search query

  const navigate = useNavigate(); // Initialize navigate

  const handleSectionClick = (section) => {
    setActiveSection(section); // Set active section when clicking navigation item
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    setAuth({});
    navigate("/");
  };

  const handleSearch = (query) => {
    setSearchQuery(query); // Store search query
    console.log("Search Query:", query); // For demonstration, you can filter sections or trigger search logic
    // Add filtering logic here if needed, e.g., filtering sections based on query
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="app-name">
          <span>Financial Tracker</span>
          <LiaMoneyCheckAltSolid /> {/* Money check icon */}
        </div>

        {/* Pass handleSearch function to the Search component */}
        <Search onSearch={handleSearch} />

        <nav>
          <ul>
            <li onClick={() => handleSectionClick("overview")} className={activeSection === "overview" ? "active" : ""}>
              Overview
            </li>
            <li onClick={() => handleSectionClick("tracking-log")} className={activeSection === "tracking-log" ? "active" : ""}>
              Tracking Log
            </li>
            <li onClick={() => handleSectionClick("expenses")} className={activeSection === "expenses" ? "active" : ""}>
              Expenses
            </li>
            <li onClick={() => handleSectionClick("ai-recommendations")} className={activeSection === "ai-recommendations" ? "active" : ""}>
              AI Recommendations
            </li>
            <li onClick={() => handleSectionClick("visualisation")} className={activeSection === "visualisation" ? "active" : ""}>
              Visualisation
            </li>{" "}
            {/* Visualisation link */}
            <li onClick={() => handleSectionClick("charts")} className={activeSection === "charts" ? "active" : ""}>
              Charts
            </li>
            <li onClick={() => handleSectionClick("settings")} className={activeSection === "settings" ? "active" : ""}>
              Settings
            </li>
            <li onClick={() => handleSectionClick("preferences")} className={activeSection === "preferences" ? "active" : ""}>
              Preferences
            </li>
            <li onClick={() => handleSectionClick("categories")} className={activeSection === "categories" ? "active" : ""}>
              Manage Categories
            </li>
            {/* Empty List Items (Unhoverable) */}
            <li className="unhoverable"></li>
            <li className="unhoverable"></li>
            <li className="unhoverable"></li>
            <li onClick={() => handleSectionClick("notifications")} className={activeSection === "notifications" ? "active" : ""}>
              Notifications
            </li>
            <li onClick={() => handleSectionClick("help")} className={activeSection === "help" ? "active" : ""}>
              Help
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Profile Section in Top-right */}
        <Profile handleSectionClick={handleSectionClick} handleLogout={handleLogout} />

        {/* Active Section Content */}
        {activeSection === "overview" && <Overview />}
        {activeSection === "tracking-log" && <TrackingLog />}
        {activeSection === "expenses" && <Expenses />}
        {activeSection === "ai-recommendations" && <AIRecommendations />}
        {activeSection === "visualisation" && <VisualisationChart />}
        {activeSection === "charts" && <Charts />}
        {activeSection === "settings" && <Settings />}
        {activeSection === "preferences" && <Preferences />}
        {activeSection === "categories" && <Categories />}

        {/* Add Notifications and Help here */}
        {activeSection === "notifications" && <Notifications />}
        {activeSection === "help" && <Help />}

        {/* Footer Section */}
        <div className="site">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
