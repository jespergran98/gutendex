import React, { useState, useEffect } from 'react';
import { useSearch } from '../../context/SearchContext';
import './SearchBar.css';

function SearchBar() {
  const { searchTerm, updateSearch, clearSearch } = useSearch();
  const [localValue, setLocalValue] = useState(searchTerm);

  // Sync local value with context when context changes externally
  useEffect(() => {
    setLocalValue(searchTerm);
  }, [searchTerm]);

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      updateSearch(localValue);
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timer);
  }, [localValue, updateSearch]);

  const handleClear = () => {
    setLocalValue('');
    clearSearch();
  };

  return (
    <div className="search-bar">
      <svg
        className="search-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="text"
        className="search-input"
        placeholder="Search for books, authors, or topics..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        aria-label="Search books"
      />
      {localValue && (
        <button
          className="search-clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default SearchBar;