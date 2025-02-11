import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
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
        <p>Phone: (111) 1111-1111</p>
      </div>
    </footer>
  );
};

export default Footer;
