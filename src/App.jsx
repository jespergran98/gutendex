import React from 'react';
import { CacheProvider } from './context/CacheContext';
import { BookmarkProvider } from './context/BookmarkContext';
import { FilterProvider } from './context/FilterContext';
import { SortProvider } from './context/SortContext';
import { SearchProvider } from './context/SearchContext';
import HomePage from './pages/HomePage/HomePage';
import './App.css';

function App() {
  return (
    <CacheProvider>
      <SearchProvider>
        <SortProvider>
          <FilterProvider>
            <BookmarkProvider>
              <HomePage />
            </BookmarkProvider>
          </FilterProvider>
        </SortProvider>
      </SearchProvider>
    </CacheProvider>
  );
}

export default App;