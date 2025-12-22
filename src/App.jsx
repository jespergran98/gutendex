import React from 'react';
import { BookmarkProvider } from './context/BookmarkContext';
import HomePage from './pages/HomePage/HomePage';
import './App.css';

function App() {
  return (
    <BookmarkProvider>
      <HomePage />
    </BookmarkProvider>
  );
}

export default App;