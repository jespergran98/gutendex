import React, { useState, useEffect } from 'react';
import BookCard from '../BookCard/BookCard';
import './BookGrid.css';

function BookGrid({ selectedCategory }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let apiUrl = `https://gutendex.com/books/?page=${page}`;
        
        if (selectedCategory === 'All') {
          apiUrl += '&sort=popular';
        } else {
          apiUrl += `&topic=${selectedCategory.toLowerCase()}`;
        }
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) throw new Error('Failed to fetch books');
        
        const data = await response.json();
        
        setBooks(prev => page === 1 ? data.results : [...prev, ...data.results]);
        setHasMore(data.next !== null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [selectedCategory, page]);

  // Reset page when category changes
  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  const handleRetry = () => {
    setBooks([]);
    setPage(1);
    setError(null);
  };

  if (loading && books.length === 0) {
    return (
      <div className="book-grid-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading books...</p>
        </div>
      </div>
    );
  }

  if (error && books.length === 0) {
    return (
      <div className="book-grid-container">
        <div className="error-state">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p>Failed to load books</p>
          <button onClick={handleRetry} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (books.length === 0 && !loading) {
    return (
      <div className="book-grid-container">
        <div className="error-state">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <p>No books found for this category</p>
        </div>
      </div>
    );
  }

  return (
    <div className="book-grid-container">
      <div className="book-grid">
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      
      {hasMore && (
        <div className="load-more-container">
          <button 
            onClick={() => setPage(prev => prev + 1)} 
            className="load-more-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="loading-spinner-small"></div>
                Loading...
              </>
            ) : (
              'Load More Books'
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default BookGrid;