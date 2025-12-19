import React, { useState } from 'react';
import './SortButton.css';

function SortButton() {
  const [direction, setDirection] = useState('down');

  const handleClick = () => {
    setDirection(prev => prev === 'down' ? 'up' : 'down');
  };

  return (
    <button 
      className="sort-button" 
      aria-label="Sort books"
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="sort-icon"
      >
        {direction === 'down' ? (
          <>
            <path d="m3 16 4 4 4-4" />
            <path d="M7 20V4" />
            <path d="m21 8-4-4-4 4" />
            <path d="M17 4v16" />
          </>
        ) : (
          <>
            <path d="m3 8 4-4 4 4" />
            <path d="M7 4v16" />
            <path d="m21 16-4 4-4-4" />
            <path d="M17 20V4" />
          </>
        )}
      </svg>
      <span>Sort</span>
    </button>
  );
}

export default SortButton;