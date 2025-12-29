import React from 'react';
import { useBookmarks } from '../../context/BookmarkContext';
import BookCard from '../../components/BookCard/BookCard';
import './BookmarkedPage.css';

function BookmarkedPage({ onBookClick }) {
  const { bookmarkedBooks } = useBookmarks();

  if (bookmarkedBooks.length === 0) {
    return (
      <div className="bookmarked-page">
        <div className="empty-state">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          <h2>No Bookmarked Books</h2>
          <p>Start exploring and bookmark your favorite books to see them here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bookmarked-page">
      <div className="bookmarked-header">
        <h1>My Bookmarks</h1>
        <p className="bookmark-count">{bookmarkedBooks.length} {bookmarkedBooks.length === 1 ? 'book' : 'books'} saved</p>
      </div>
      <div className="bookmarked-grid">
        {bookmarkedBooks.map(book => (
          <BookCard 
            key={book.id} 
            book={book}
            onBookClick={onBookClick}
          />
        ))}
      </div>
    </div>
  );
}

export default BookmarkedPage;