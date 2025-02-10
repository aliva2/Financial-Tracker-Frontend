import React, { useState } from 'react';
import './Help.css';

const Help = () => {
  const [activeContent, setActiveContent] = useState(null);

  const handleSectionClick = (section) => {
    setActiveContent(section); // Change content when a section is clicked
  };

  return (
    <div className="site-content">
      <div className="help-center">
        <h1>Help Center</h1>
        <p>How can we assist you today? Select a category below for more information.</p>

        {/* Help Menu */}
        <div className="help-menu">
          <button onClick={() => handleSectionClick('faqs')}>FAQs</button>
          <button onClick={() => handleSectionClick('user-guide')}>User Guide</button>
          <button onClick={() => handleSectionClick('troubleshooting')}>Troubleshooting</button>
          <button onClick={() => handleSectionClick('contacts')}>Contact Support</button>
        </div>

        {/* Display Content Based on Active Section */}
        <div className="help-content">
          {activeContent === 'faqs' && (
            <div className="help-section">
              <h2>FAQs</h2>
              <p>Find answers to the most frequently asked questions.</p>
              <div>
                <strong>How can I check my expenses?</strong>
                <p>Click on "Expenses" in the sidebar to view your recent transactions.</p>
              </div>
              <div>
                <strong>How do I add a new expense?</strong>
                <p>To add a new expense, click on the "Add Expense" button in the "Expenses" section and fill out the required details.</p>
              </div>
              <div>
                <strong>How can I view my financial summary?</strong>
                <p>Your financial summary can be found under the "Overview" section, which shows key metrics like income, expenses, and savings.</p>
              </div>
              <div>
                <strong>What should I do if I notice an error in my expenses?</strong>
                <p>If you see an error, you can edit your expense directly in the "Expenses" section. If the issue persists, contact support.</p>
              </div>
              <div>
                <strong>Can I export my expenses data?</strong>
                <p>Yes, you can export your expenses as a CSV file by clicking the "Export" button in the "Expenses" section.</p>
              </div>
              <div>
                <strong>How do I delete my account?</strong>
                <p>If you want to delete your account, go to the "Settings" section and click "Delete Account" under account settings. Please note that this action is permanent.</p>
              </div>
            </div>
          )}

          {activeContent === 'user-guide' && (
            <div className="help-section">
              <h2>User Guide</h2>
              <p>Learn how to use the app with our step-by-step user guide.</p>
              <div>
                <strong>Step 1: Create an Account</strong>
                <p>To create an account, click on "Sign Up" and provide the necessary details.</p>
              </div>
              <div>
                <strong>Step 2: Add Expenses</strong>
                <p>Once logged in, click on "Add Expense" to enter your expenses.</p>
              </div>
            </div>
          )}

          {activeContent === 'troubleshooting' && (
            <div className="help-section">
              <h2>Troubleshooting</h2>
              <p>If you're facing any issues, check our troubleshooting tips below.</p>
              <div>
                <strong>App Won't Load</strong>
                <p>Try restarting the app or clearing the cache in your browser.</p>
              </div>
              <div>
                <strong>Unable to Add Expense</strong>
                <p>Ensure you have entered all required fields and your internet connection is stable.</p>
              </div>
            </div>
          )}

          {activeContent === 'contacts' && (
            <div className="help-section">
              <h2>Contact Support</h2>
              <p>If you need further assistance, our support team is here to help. Choose a contact method:</p>
              <div>
                <strong>Email:</strong>
                <p>support@financialtracker.com</p>
              </div>
              <div>
                <strong>Phone:</strong>
                <p>+1 (111) 1111-1111</p>
              </div>
              <p>We are available Monday to Friday, 9 AM - 5 PM.</p>
            </div>
          )}

          {/* If no section is selected */}
          {!activeContent && (
            <div className="help-section">
              <p>Please select a category to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Help;
