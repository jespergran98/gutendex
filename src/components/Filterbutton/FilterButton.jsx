import React from 'react';
import './FilterButton.css';

function FilterButton() {
  return (
    <button className="filter-button" aria-label="Filter books">
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
      >
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
      <span>Filter</span>
    </button>
  );
}

export default FilterButton;