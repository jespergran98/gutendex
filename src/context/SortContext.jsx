import React, { createContext, useContext, useState } from 'react';

const SortContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSort = () => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error('useSort must be used within SortProvider');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export const SORT_OPTIONS = {
  POPULARITY: { id: 'popularity', label: 'Popularity', icon: '★', apiParam: 'popular' },
  TITLE: { id: 'title', label: 'Title', icon: 'A-Z', apiParam: 'title' },
  AUTHOR: { id: 'author', label: 'Author', icon: 'Author', apiParam: 'author' },
  ID: { id: 'id', label: 'ID', icon: '#', apiParam: 'id' },
  BIRTH_YEAR: { id: 'birth_year', label: 'Birth Year', icon: 'Birth', apiParam: 'birth_year' },
  DEATH_YEAR: { id: 'death_year', label: 'Death Year', icon: 'Death', apiParam: 'death_year' }
};

export const SortProvider = ({ children }) => {
  const [sortOption, setSortOption] = useState(SORT_OPTIONS.POPULARITY.id);
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'

  const updateSort = (option, order) => {
    setSortOption(option);
    setSortOrder(order);
  };

  const toggleOrder = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  const getCurrentSortOption = () => {
    return Object.values(SORT_OPTIONS).find(opt => opt.id === sortOption) || SORT_OPTIONS.POPULARITY;
  };

  return (
    <SortContext.Provider value={{ 
      sortOption, 
      sortOrder, 
      updateSort, 
      toggleOrder,
      getCurrentSortOption,
      SORT_OPTIONS 
    }}>
      {children}
    </SortContext.Provider>
  );
};