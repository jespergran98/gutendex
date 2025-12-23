import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within FilterProvider');
  }
  return context;
};

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    birthYearStart: '',
    birthYearEnd: '',
    languages: []
  });

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      birthYearStart: '',
      birthYearEnd: '',
      languages: []
    });
  };

  const hasActiveFilters = () => {
    return !!(
      filters.birthYearStart ||
      filters.birthYearEnd ||
      filters.languages.length > 0
    );
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilters, clearFilters, hasActiveFilters }}>
      {children}
    </FilterContext.Provider>
  );
};