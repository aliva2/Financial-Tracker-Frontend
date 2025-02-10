import React, { useState } from 'react';
import './AIRecommendations.css';

const AIRecommendations = () => {
  // AI-generated recommendations
  const [recommendations, setRecommendations] = useState([
    "Try saving 20% of your monthly income to build your emergency fund.",
    "Cut down on dining out to save more for investments.",
    "Consider investing in diversified portfolios for better returns.",
    "Track your subscriptions to identify potential savings."
  ]);

  // State for user input (notes)
  const [newNote, setNewNote] = useState('');

  const handleInputChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleSubmit = () => {
    if (newNote.trim()) {
      // Add user note to the AI recommendations list
      setRecommendations([...recommendations, newNote]);
      setNewNote(''); // Clear input after submission
    }
  };

  return (
    <div className="site-content">
      <div className="ai-recommendations-container">
        <div className="ai-recommendations">
          <h2>AI Recommendations</h2>
          <p>Here are some AI-generated recommendations to improve your financial planning.</p>

          {/* Display AI recommendations */}
          <div className="recommendations-list">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="recommendation-item">
                <p>{recommendation}</p>
              </div>
            ))}
          </div>

          {/* Textbox for adding user notes */}
          <div className="input-section">
            <h3>Write your own note:</h3>
            <textarea
              value={newNote}
              onChange={handleInputChange}
              placeholder="Enter your suggestion..." 
              rows="4" 
              cols="50"
            />
            <button onClick={handleSubmit}>Submit Note</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;
