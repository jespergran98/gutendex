import React from 'react';
import { useBookmarks } from '../../context/BookmarkContext';
import './BookCard.css';

function BookCard({ book }) {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(book.id);
  
  const coverImage = book.formats['image/jpeg'] || '/assets/placeholder-book.png';
  const author = book.authors?.[0]?.name || 'Unknown Author';
  const downloads = book.download_count?.toLocaleString() || '0';

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    toggleBookmark(book);
  };

  return (
    <div className="book-card">
      <div className="book-cover-container">
        <img 
          src={coverImage} 
          alt={book.title}
          className="book-cover"
          loading="lazy"
        />
        <button 
          className={`bookmark-button ${bookmarked ? 'bookmarked' : ''}`}
          onClick={handleBookmarkClick}
          aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={bookmarked ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{author}</p>
        <span className="download-count">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {downloads}
        </span>
      </div>
    </div>
  );
}

export default BookCard;