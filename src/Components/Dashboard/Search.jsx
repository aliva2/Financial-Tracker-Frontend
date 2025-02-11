import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Import the search icon
import './Search.css';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value); // Send search input to parent component (Dashboard)
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        className="search-input"
      />
      <div className="search-icon">
        <FaSearch /> {/* Search icon */}
      </div>
    </div>
  );
};

export default Search;
