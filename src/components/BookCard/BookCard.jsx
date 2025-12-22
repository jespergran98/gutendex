import React from 'react';
import './BookCard.css';

function BookCard({ book }) {
  const coverImage = book.formats['image/jpeg'] || '/assets/placeholder-book.png';
  const author = book.authors?.[0]?.name || 'Unknown Author';
  const downloads = book.download_count?.toLocaleString() || '0';

  return (
    <div className="book-card">
      <img 
        src={coverImage} 
        alt={book.title}
        className="book-cover"
        loading="lazy"
      />
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