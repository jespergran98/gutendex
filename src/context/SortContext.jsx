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

// SVG Icon Components
const PopularityIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
);

const TitleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);

const AuthorIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
  </svg>
);

const IdIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="9" x2="20" y2="9"/>
    <line x1="4" y1="15" x2="20" y2="15"/>
    <line x1="10" y1="3" x2="8" y2="21"/>
    <line x1="16" y1="3" x2="14" y2="21"/>
  </svg>
);

const BirthYearIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

// eslint-disable-next-line react-refresh/only-export-components
export const SORT_OPTIONS = {
  POPULARITY: { 
    id: 'popularity', 
    label: 'Popularity', 
    icon: <PopularityIcon />,
    apiParam: 'popular',
    naturalOrder: 'desc', // Most popular (highest downloads) first when arrow is UP
    useApi: true
  },
  TITLE: { 
    id: 'title', 
    label: 'Title', 
    icon: <TitleIcon />,
    apiParam: null,
    naturalOrder: 'asc', // A to Z when arrow is UP
    useApi: false
  },
  AUTHOR: { 
    id: 'author', 
    label: 'Author', 
    icon: <AuthorIcon />,
    apiParam: null,
    naturalOrder: 'asc', // A to Z when arrow is UP
    useApi: false
  },
  ID: { 
    id: 'id', 
    label: 'ID', 
    icon: <IdIcon />,
    apiParam: 'id',
    naturalOrder: 'asc', // Lowest ID (1, 2, 3...) first when arrow is UP
    useApi: true
  },
  BIRTH_YEAR: { 
    id: 'birth_year', 
    label: 'Birth Year', 
    icon: <BirthYearIcon />,
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