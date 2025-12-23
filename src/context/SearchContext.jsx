import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const updateSearch = (term) => {
    setSearchTerm(term);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <SearchContext.Provider value={{ 
      searchTerm, 
      updateSearch,
      clearSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
};