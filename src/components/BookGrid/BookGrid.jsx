import React, { useState, useEffect, useCallback } from 'react';
import { useFilters } from '../../context/FilterContext';
import { useSort } from '../../context/SortContext';
import { useSearch } from '../../context/SearchContext';
import BookCard from '../BookCard/BookCard';
import './BookGrid.css';

function BookGrid({ selectedCategory }) {
  const { filters } = useFilters();
  const { sortOption, sortOrder, getCurrentSortOption } = useSort();
  const { searchTerm } = useSearch();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Reset when filters, sorting, or search changes
  useEffect(() => {
    setBooks([]);
    setPage(1);
    setError(null);
  }, [selectedCategory, filters, sortOption, sortOrder, searchTerm]);

  // Client-side sorting function wrapped in useCallback
  const sortBooks = useCallback((booksToSort) => {
    const currentSort = getCurrentSortOption();
    
    // Don't sort if using API sorting
    if (currentSort.useApi) {
      return booksToSort;
    }

    const sorted = [...booksToSort];
    
    switch (currentSort.id) {
      case 'title':
        sorted.sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();
          return sortOrder === 'asc' 
            ? titleA.localeCompare(titleB)
            : titleB.localeCompare(titleA);
        });
        break;
        
      case 'author':
        sorted.sort((a, b) => {
          const authorA = (a.authors?.[0]?.name || 'Unknown').toLowerCase();
          const authorB = (b.authors?.[0]?.name || 'Unknown').toLowerCase();
          return sortOrder === 'asc'
            ? authorA.localeCompare(authorB)
            : authorB.localeCompare(authorA);
        });
        break;
        
      case 'birth_year':
        sorted.sort((a, b) => {
          const yearA = a.authors?.[0]?.birth_year || 0;
          const yearB = b.authors?.[0]?.birth_year || 0;
          return sortOrder === 'asc'
            ? yearA - yearB
            : yearB - yearA;
        });
        break;
        
      default:
        break;
    }
    
    return sorted;
  }, [sortOrder, getCurrentSortOption]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let apiUrl = `https://gutendex.com/books/?page=${page}`;
        
        // Apply search term
        if (searchTerm && searchTerm.trim()) {
          apiUrl += `&search=${encodeURIComponent(searchTerm.trim())}`;
        }
        
        // Apply category filter (only if no search term, as search is more specific)
        if (selectedCategory !== 'All' && !searchTerm) {
          apiUrl += `&topic=${encodeURIComponent(selectedCategory.toLowerCase())}`;
        }
        
        // Apply API sorting (only for popularity and ID)
        const currentSort = getCurrentSortOption();
        if (currentSort.useApi) {
          if (currentSort.id === 'popularity') {
            // Gutendex API: popular is always descending
            // If user wants ascending popularity, we'll sort client-side
            if (sortOrder === 'desc') {
              apiUrl += `&sort=popular`;
            }
            // For ascending popularity, we fetch with popular and sort client-side
          } else if (currentSort.id === 'id') {
            // For ID sorting, use ascending or descending based on sortOrder
            apiUrl += sortOrder === 'asc' ? `&sort=ascending` : `&sort=descending`;
          }
        }
        
        // Apply author year filters
        if (filters.birthYearStart) {
          apiUrl += `&author_year_start=${filters.birthYearStart}`;
        }
        if (filters.birthYearEnd) {
          apiUrl += `&author_year_end=${filters.birthYearEnd}`;
        }
        
        // Apply language filters
        if (filters.languages.length > 0) {
          apiUrl += `&languages=${filters.languages.join(',')}`;
        }
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch books: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Sort results if needed
        let results = data.results;
        
        // Handle special case: ascending popularity needs client-side sort
        if (currentSort.id === 'popularity' && sortOrder === 'asc') {
          results = [...results].sort((a, b) => a.download_count - b.download_count);
        }
        // Apply client-side sorting for non-API sorts
        else if (!currentSort.useApi) {
          results = sortBooks(results);
        }
        
        // Update books list
        setBooks(prev => {
          if (page === 1) {
            return results;
          }
          // For client-side sorting, we need to sort the combined array
          if (!currentSort.useApi || (currentSort.id === 'popularity' && sortOrder === 'asc')) {
            return sortBooks([...prev, ...results]);
          }
          return [...prev, ...results];
        });
        
        setHasMore(data.next !== null);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [selectedCategory, page, filters, sortOption, sortOrder, searchTerm, getCurrentSortOption, sortBooks]);

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
          <p>No books found with current filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="book-grid-container">
      <div className="book-grid">
        {books.map(book => (
          <BookCard key={`${book.id}-${page}`} book={book} />
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