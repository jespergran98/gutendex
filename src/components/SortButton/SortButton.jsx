import React from 'react';
import { useSort } from '../../context/SortContext';
import './SortButton.css';

function SortButton({ onClick }) {
  const { getCurrentSortOption, sortOrder } = useSort();
  const currentOption = getCurrentSortOption();

  return (
    <button 
      className="sort-button" 
      aria-label="Sort books"
      onClick={onClick}
    >
      <span className="sort-label">{currentOption.icon}</span>
      <span className="sort-arrow">{sortOrder === 'desc' ? '↓' : '↑'}</span>
    </button>
  );
}

export default SortButton;