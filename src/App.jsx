import React from 'react';
import { BookmarkProvider } from './context/BookmarkContext';
import { FilterProvider } from './context/FilterContext';
import HomePage from './pages/HomePage/HomePage';
import './App.css';

function App() {
  return (
    <FilterProvider>
      <BookmarkProvider>
        <HomePage />
      </BookmarkProvider>
    </FilterProvider>
  );
}

export default App;