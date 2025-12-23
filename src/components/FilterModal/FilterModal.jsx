import React, { useState, useEffect } from 'react';
import { useFilters } from '../../context/FilterContext';
import './FilterModal.css';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'fi', name: 'Finnish', flag: '🇫🇮' },
  { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
  { code: 'da', name: 'Danish', flag: '🇩🇰' },
  { code: 'no', name: 'Norwegian', flag: '🇳🇴' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱' },
  { code: 'cs', name: 'Czech', flag: '🇨🇿' },
  { code: 'hu', name: 'Hungarian', flag: '🇭🇺' },
  { code: 'el', name: 'Greek', flag: '🇬🇷' },
  { code: 'la', name: 'Latin', flag: '🏛️' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
];

function FilterModal({ isOpen, onClose }) {
  const { filters, updateFilters, clearFilters } = useFilters();
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters);
    }
  }, [isOpen, filters]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleInputChange = (field, value) => {
    setLocalFilters(prev => ({ ...prev, [field]: value }));
  };

  const toggleLanguage = (code) => {
    setLocalFilters(prev => ({
      ...prev,
      languages: prev.languages.includes(code)
        ? prev.languages.filter(l => l !== code)
        : [...prev.languages, code]
    }));
  };

  const handleApply = () => {
    updateFilters(localFilters);
    onClose();
  };

  const handleClear = () => {
    const emptyFilters = {
      birthYearStart: '',
      birthYearEnd: '',
      languages: []
    };
    setLocalFilters(emptyFilters);
    clearFilters();
  };

  if (!isOpen) return null;

  return (
    <div className="filter-modal-overlay" onClick={handleBackdropClick}>
      <div className="filter-modal">
        <div className="filter-modal-header">
          <h2>Filter Books</h2>
          <button 
            className="close-button"
            onClick={onClose}
            aria-label="Close filter modal"
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
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="filter-modal-content">
          <section className="filter-section">
            <h3 className="filter-section-title">Author Birth Year</h3>
            
            <div className="filter-group">
              <div className="year-range-inputs">
                <input
                  type="number"
                  placeholder="From (e.g., 1800)"
                  value={localFilters.birthYearStart}
                  onChange={(e) => handleInputChange('birthYearStart', e.target.value)}
                  className="year-input"
                  min="0"
                  max="2100"
                />
                <span className="range-separator">—</span>
                <input
                  type="number"
                  placeholder="To (e.g., 1900)"
                  value={localFilters.birthYearEnd}
                  onChange={(e) => handleInputChange('birthYearEnd', e.target.value)}
                  className="year-input"
                  min="0"
                  max="2100"
                />
              </div>
            </div>
          </section>

          <section className="filter-section">
            <h3 className="filter-section-title">Languages</h3>
            <div className="language-grid">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  type="button"
                  className={`language-item ${localFilters.languages.includes(lang.code) ? 'selected' : ''}`}
                  onClick={() => toggleLanguage(lang.code)}
                >
                  <span className="language-flag">{lang.flag}</span>
                  <span className="language-name">{lang.name}</span>
                  {localFilters.languages.includes(lang.code) && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="check-icon"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="filter-modal-footer">
          <button 
            type="button"
            className="clear-button" 
            onClick={handleClear}
          >
            Clear All
          </button>
          <button 
            type="button"
            className="apply-button" 
            onClick={handleApply}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;