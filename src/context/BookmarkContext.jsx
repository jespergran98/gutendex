import React, { createContext, useContext, useState } from 'react';

const BookmarkContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within BookmarkProvider');
  }
  return context;
};

export const BookmarkProvider = ({ children }) => {
  const [bookmarkedBooks, setBookmarkedBooks] = useState([]);

  const toggleBookmark = (book) => {
    setBookmarkedBooks(prev => {
      const isBookmarked = prev.some(b => b.id === book.id);
      if (isBookmarked) {
        return prev.filter(b => b.id !== book.id);
      }
      return [...prev, book];
    });
  };

  const isBookmarked = (bookId) => {
    return bookmarkedBooks.some(b => b.id === bookId);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedBooks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};