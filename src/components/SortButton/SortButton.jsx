import React from 'react';
import { useSort } from '../../context/SortContext';
import './SortButton.css';

function SortButton({ onClick }) {
  const { getCurrentSortOption, sortOrder } = useSort();
  const currentOption = getCurrentSortOption();
  
  // Arrow points UP when in natural order, DOWN when reversed
  const isNaturalOrder = sortOrder === currentOption.naturalOrder;

  return (
    <button 
      className="sort-button" 
      aria-label="Sort books"
      onClick={onClick}
    >
      <span className="sort-label">{currentOption.icon}</span>
      <span className="sort-arrow">{isNaturalOrder ? '↑' : '↓'}</span>
    </button>
  );
}

export default SortButton;