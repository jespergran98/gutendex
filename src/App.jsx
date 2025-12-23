import React from 'react';
import { BookmarkProvider } from './context/BookmarkContext';
import { FilterProvider } from './context/FilterContext';
import { SortProvider } from './context/SortContext';
import HomePage from './pages/HomePage/HomePage';
import './App.css';

function App() {
  return (
    <SortProvider>
      <FilterProvider>
        <BookmarkProvider>
          <HomePage />
        </BookmarkProvider>
      </FilterProvider>
    </SortProvider>
  );
}

export default App;