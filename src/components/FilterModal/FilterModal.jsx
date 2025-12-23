import React, { useState, useEffect } from 'react';
import { useFilters } from '../../context/FilterContext';
import './FilterModal.css';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: 'gb' },
  { code: 'fr', name: 'French', flag: 'fr' },
  { code: 'de', name: 'German', flag: 'de' },
  { code: 'es', name: 'Spanish', flag: 'es' },
  { code: 'it', name: 'Italian', flag: 'it' },
  { code: 'pt', name: 'Portuguese', flag: 'pt' },
  { code: 'nl', name: 'Dutch', flag: 'nl' },
  { code: 'ru', name: 'Russian', flag: 'ru' },
  { code: 'zh', name: 'Chinese', flag: 'cn' },
  { code: 'ja', name: 'Japanese', flag: 'jp' },
  { code: 'fi', name: 'Finnish', flag: 'fi' },
  { code: 'sv', name: 'Swedish', flag: 'se' },
  { code: 'da', name: 'Danish', flag: 'dk' },
  { code: 'no', name: 'Norwegian', flag: 'no' },
  { code: 'pl', name: 'Polish', flag: 'pl' },
  { code: 'cs', name: 'Czech', flag: 'cz' },
  { code: 'hu', name: 'Hungarian', flag: 'hu' },
  { code: 'el', name: 'Greek', flag: 'gr' },
  { code: 'la', name: 'Latin', flag: 'va' },
  { code: 'ar', name: 'Arabic', flag: 'sa' }
];

function FilterModal({ isOpen, onClose }) {
  const { filters, updateFilters, clearFilters } = useFilters();

  if (!isOpen) return null;

  return (
    <FilterModalContent
      key={isOpen ? 'open' : 'closed'}
      filters={filters}
      updateFilters={updateFilters}
      clearFilters={clearFilters}
      onClose={onClose}
    />
  );
}

function FilterModalContent({ filters, updateFilters, clearFilters, onClose }) {
  const [localState, setLocalState] = useState({
    birthYearStart: filters.birthYearStart || '',
    birthYearEnd: filters.birthYearEnd || '',
    selectedLanguages: filters.languages || []
  });

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const toggleLanguage = (code) => {
    setLocalState(prev => ({
      ...prev,
      selectedLanguages: prev.selectedLanguages.includes(code)
        ? prev.selectedLanguages.filter(l => l !== code)
        : [...prev.selectedLanguages, code]
    }));
  };

  const handleApply = () => {
    updateFilters({
      birthYearStart: localState.birthYearStart,
      birthYearEnd: localState.birthYearEnd,
      languages: localState.selectedLanguages
    });
    onClose();
  };

  const handleClear = () => {
    setLocalState({
      birthYearStart: '',
      birthYearEnd: '',
      selectedLanguages: []
    });
    clearFilters();
  };

  return (
    <div className="filter-modal-overlay" onClick={handleBackdropClick}>
      <div className="filter-modal">
        <div className="filter-modal-header">
          <h2>Filters</h2>
          <button 
            className="close-button"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="filter-modal-content">
          <section className="filter-section">
            <h3>Author Birth Year</h3>
            <div className="year-inputs">
              <input
                type="number"
                placeholder="From"
                value={localState.birthYearStart}
                onChange={(e) => setLocalState(prev => ({ ...prev, birthYearStart: e.target.value }))}
                className="year-input"
              />
              <span className="separator">—</span>
              <input
                type="number"
                placeholder="To"
                value={localState.birthYearEnd}
                onChange={(e) => setLocalState(prev => ({ ...prev, birthYearEnd: e.target.value }))}
                className="year-input"
              />
            </div>
          </section>

          <section className="filter-section">
            <h3>Languages</h3>
            <div className="language-grid">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  className={`language-item ${localState.selectedLanguages.includes(lang.code) ? 'selected' : ''}`}
                  onClick={() => toggleLanguage(lang.code)}
                >
                  <img 
                    src={`/flags/${lang.flag}.svg`} 
                    alt=""
                    className="language-flag"
                  />
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="filter-modal-footer">
          <button className="clear-button" onClick={handleClear}>
            Clear
          </button>
          <button className="apply-button" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;