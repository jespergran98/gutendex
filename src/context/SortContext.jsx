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
  POPULARITY: { 
    id: 'popularity', 
    label: 'Popularity', 
    icon: '★', 
    apiParam: 'popular',
    naturalOrder: 'desc', // Most popular (highest downloads) first when arrow is UP
    useApi: true
  },
  TITLE: { 
    id: 'title', 
    label: 'Title', 
    icon: 'A-Z', 
    apiParam: null,
    naturalOrder: 'asc', // A to Z when arrow is UP
    useApi: false
  },
  AUTHOR: { 
    id: 'author', 
    label: 'Author', 
    icon: 'Author', 
    apiParam: null,
    naturalOrder: 'asc', // A to Z when arrow is UP
    useApi: false
  },
  ID: { 
    id: 'id', 
    label: 'ID', 
    icon: '#', 
    apiParam: 'id',
    naturalOrder: 'asc', // Lowest ID (1, 2, 3...) first when arrow is UP
    useApi: true
  },
  BIRTH_YEAR: { 
    id: 'birth_year', 
    label: 'Birth Year', 
    icon: 'Birth', 
    apiParam: null,
    naturalOrder: 'desc', // Youngest authors (most recent birth years) first when arrow is UP
    useApi: false
  }
};

export const SortProvider = ({ children }) => {
  const [sortOption, setSortOption] = useState(SORT_OPTIONS.POPULARITY.id);
  const [sortOrder, setSortOrder] = useState(SORT_OPTIONS.POPULARITY.naturalOrder);

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