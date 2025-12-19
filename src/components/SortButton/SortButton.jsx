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
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`sort-icon ${direction === 'up' ? 'rotate' : ''}`}
      >
        <path d="M3 6h18" />
        <path d="M7 12h10" />
        <path d="M10 18h4" />
      </svg>
      <span>Sort</span>
    </button>
  );
}

export default SortButton;