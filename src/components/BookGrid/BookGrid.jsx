import React, { useState, useEffect, useCallback } from 'react';
import { useFilters } from '../../context/FilterContext';
import { useSort } from '../../context/SortContext';
import { useSearch } from '../../context/SearchContext';
import { useCache } from '../../context/CacheContext';
import BookCard from '../BookCard/BookCard';
import './BookGrid.css';

function BookGrid({ selectedCategory, onBookClick }) {
  const { filters } = useFilters();
  const { sortOption, sortOrder, getCurrentSortOption } = useSort();
  const { searchTerm } = useSearch();
  const { getCachedData, setCachedData } = useCache();
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

  // Build cache key from API parameters
  const buildCacheKey = useCallback((pageNum) => {
    const params = new URLSearchParams();
    params.set('page', pageNum);
    
    if (searchTerm && searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    }
    
    if (selectedCategory !== 'All' && !searchTerm) {
      params.set('topic', selectedCategory.toLowerCase());
    }
    
    const currentSort = getCurrentSortOption();
    if (currentSort.useApi) {
      if (currentSort.id === 'popularity' && sortOrder === 'desc') {
        params.set('sort', 'popular');
      } else if (currentSort.id === 'id') {
        params.set('sort', sortOrder === 'asc' ? 'ascending' : 'descending');
      }
    }
    
    if (filters.birthYearStart) {
      params.set('author_year_start', filters.birthYearStart);
    }
    if (filters.birthYearEnd) {
      params.set('author_year_end', filters.birthYearEnd);
    }
    if (filters.languages.length > 0) {
      params.set('languages', filters.languages.join(','));
    }
    
    return params.toString();
  }, [selectedCategory, searchTerm, getCurrentSortOption, sortOrder, filters]);

  // Client-side sorting function
  const sortBooks = useCallback((booksToSort) => {
    const currentSort = getCurrentSortOption();
    
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
        
        // Build cache key
        const cacheKey = buildCacheKey(page);
        
        // Check cache first
        const cachedEntry = getCachedData(cacheKey);
        if (cachedEntry) {
          const { data } = cachedEntry;
          
          // Apply client-side sorting if needed
          let results = data.results;
          const currentSort = getCurrentSortOption();
          
          if (currentSort.id === 'popularity' && sortOrder === 'asc') {
            results = [...results].sort((a, b) => a.download_count - b.download_count);
          } else if (!currentSort.useApi) {
            results = sortBooks(results);
          }
          
          // Update books list
          setBooks(prev => {
            if (page === 1) {
              return results;
            }
            if (!currentSort.useApi || (currentSort.id === 'popularity' && sortOrder === 'asc')) {
              return sortBooks([...prev, ...results]);
            }
            return [...prev, ...results];
          });
          
          setHasMore(data.next !== null);
          setLoading(false);
          return;
        }
        
        // Build API URL
        let apiUrl = `https://gutendex.com/books/?page=${page}`;
        
        if (searchTerm && searchTerm.trim()) {
          apiUrl += `&search=${encodeURIComponent(searchTerm.trim())}`;
        }
        
        if (selectedCategory !== 'All' && !searchTerm) {
          apiUrl += `&topic=${encodeURIComponent(selectedCategory.toLowerCase())}`;
        }
        
        const currentSort = getCurrentSortOption();
        if (currentSort.useApi) {
          if (currentSort.id === 'popularity') {
            if (sortOrder === 'desc') {
              apiUrl += `&sort=popular`;
            }
          } else if (currentSort.id === 'id') {
            apiUrl += sortOrder === 'asc' ? `&sort=ascending` : `&sort=descending`;
          }
        }
        
        if (filters.birthYearStart) {
          apiUrl += `&author_year_start=${filters.birthYearStart}`;
        }
        if (filters.birthYearEnd) {
          apiUrl += `&author_year_end=${filters.birthYearEnd}`;
        }
        if (filters.languages.length > 0) {
          apiUrl += `&languages=${filters.languages.join(',')}`;
        }
        
        // Fetch from API
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch books: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Cache the raw response
        setCachedData(cacheKey, data);
        
        // Sort results if needed
        let results = data.results;
        
        if (currentSort.id === 'popularity' && sortOrder === 'asc') {
          results = [...results].sort((a, b) => a.download_count - b.download_count);
        } else if (!currentSort.useApi) {
          results = sortBooks(results);
        }
        
        // Update books list
        setBooks(prev => {
          if (page === 1) {
            return results;
          }
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
  }, [selectedCategory, page, filters, sortOption, sortOrder, searchTerm, getCurrentSortOption, sortBooks, buildCacheKey, getCachedData, setCachedData]);

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
          <BookCard 
            key={`${book.id}-${page}`} 
            book={book}
            onBookClick={onBookClick}
          />
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