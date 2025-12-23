import React, { useEffect } from 'react';
import { useSort } from '../../context/SortContext';
import './SortModal.css';

function SortModal({ isOpen, onClose }) {
  const { sortOption, sortOrder, updateSort, SORT_OPTIONS } = useSort();

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleOptionClick = (optionId) => {
    if (optionId === sortOption) {
      // Toggle order if same option is clicked
      const newOrder = sortOrder === 'desc' ? 'asc' : 'desc';
      updateSort(optionId, newOrder);
    } else {
      // Set new option but keep current order direction
      updateSort(optionId, sortOrder);
    }
    onClose();
  };

  return (
    <div className="sort-modal-overlay" onClick={handleBackdropClick}>
      <div className="sort-modal">
        <div className="sort-modal-header">
          <h2>Sort By</h2>
          <button 
            className="sort-close-button"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="sort-modal-content">
          {Object.values(SORT_OPTIONS).map((option) => {
            const isSelected = option.id === sortOption;
            
            return (
              <button
                key={option.id}
                className={`sort-option ${isSelected ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option.id)}
              >
                <div className="sort-option-left">
                  <div className="sort-option-icon">{option.icon}</div>
                  <span>{option.label}</span>
                </div>
                {isSelected && (
                  <div className={`sort-option-arrow ${sortOrder}`}>
                    {sortOrder === 'desc' ? '↓' : '↑'}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SortModal;