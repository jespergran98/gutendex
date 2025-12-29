import React, { useEffect } from 'react';
import { useBookmarks } from '../../context/BookmarkContext';
import './BookDetailsPage.css';

// Language code to flag mapping
const LANGUAGE_FLAGS = {
  'en': 'gb',
  'fr': 'fr',
  'de': 'de',
  'es': 'es',
  'it': 'it',
  'pt': 'pt',
  'nl': 'nl',
  'ru': 'ru',
  'zh': 'cn',
  'ja': 'jp',
  'fi': 'fi',
  'sv': 'se',
  'da': 'dk',
  'no': 'no',
  'pl': 'pl',
  'cs': 'cz',
  'el': 'gr',
  'hu': 'hu',
  'ro': 'ro',
  'tr': 'tr',
  'ar': 'sa',
  'he': 'il',
  'hi': 'in',
  'ko': 'kr',
  'la': 'va',
  'eo': 'eo'
};

const LANGUAGE_NAMES = {
  'en': 'English',
  'fr': 'French',
  'de': 'German',
  'es': 'Spanish',
  'it': 'Italian',
  'pt': 'Portuguese',
  'nl': 'Dutch',
  'ru': 'Russian',
  'zh': 'Chinese',
  'ja': 'Japanese',
  'fi': 'Finnish',
  'sv': 'Swedish',
  'da': 'Danish',
  'no': 'Norwegian',
  'pl': 'Polish',
  'cs': 'Czech',
  'el': 'Greek',
  'hu': 'Hungarian',
  'ro': 'Romanian',
  'tr': 'Turkish',
  'ar': 'Arabic',
  'he': 'Hebrew',
  'hi': 'Hindi',
  'ko': 'Korean',
  'la': 'Latin',
  'eo': 'Esperanto'
};

function BookDetailsPage({ book, onClose }) {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(book.id);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBookmarkClick = () => {
    toggleBookmark(book);
  };

  const handleReadClick = () => {
    const htmlFormat = book.formats['text/html'];
    const plainTextFormat = book.formats['text/plain'];
    const url = htmlFormat || plainTextFormat || Object.values(book.formats)[0];
    
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const coverImage = book.formats['image/jpeg'] || '/assets/placeholder-book.png';
  const author = book.authors?.[0]?.name || 'Unknown Author';
  const authorBirthYear = book.authors?.[0]?.birth_year;
  const authorDeathYear = book.authors?.[0]?.death_year;
  const downloads = book.download_count?.toLocaleString() || '0';
  const primaryLanguage = book.languages?.[0] || 'en';
  const languageName = LANGUAGE_NAMES[primaryLanguage] || primaryLanguage.toUpperCase();
  const flagCode = LANGUAGE_FLAGS[primaryLanguage] || 'un';
  const subjects = book.subjects?.slice(0, 6) || [];

  const authorYears = authorBirthYear 
    ? `${authorBirthYear}${authorDeathYear ? ` - ${authorDeathYear}` : ''}`
    : null;

  return (
    <div className="book-details-overlay" onClick={handleOverlayClick}>
      <div className="book-details-container">
        <button 
          className="back-button" 
          onClick={onClose}
          aria-label="Go back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>

        <div className="book-details-content">
          <div className="book-details-cover-section">
            <img 
              src={coverImage} 
              alt={book.title}
              className="book-details-cover"
            />
          </div>

          <div className="book-details-info-section">
            <div className="book-details-header">
              <h1 className="book-details-title">{book.title}</h1>
              <div className="book-details-author">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="author-icon"
                >
                  <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
                <span>{author}</span>
                {authorYears && (
                  <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                    ({authorYears})
                  </span>
                )}
              </div>
            </div>

            <div className="book-details-stats">
              <div className="stat-item">
                <span className="stat-label">Downloads</span>
                <span className="stat-value">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stat-icon"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  {downloads}
                </span>
              </div>

              <div className="stat-item">
                <span className="stat-label">Language</span>
                <span className="stat-value">
                  <img 
                    src={`https://flagcdn.com/w40/${flagCode}.png`}
                    alt={languageName}
                    className="language-flag"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  {languageName}
                </span>
              </div>
            </div>

            {subjects.length > 0 && (
              <div className="book-details-subjects">
                <span className="subjects-label">Categories</span>
                <div className="subjects-list">
                  {subjects.map((subject, index) => (
                    <span key={index} className="subject-tag">
                      {subject.length > 35 ? subject.substring(0, 35) + '...' : subject}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="book-details-actions">
              <button 
                className="action-button primary-action"
                onClick={handleReadClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="action-icon"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                Read Book
              </button>

              <button 
                className={`action-button secondary-action ${bookmarked ? 'bookmarked' : ''}`}
                onClick={handleBookmarkClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={bookmarked ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="action-icon"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                {bookmarked ? 'Bookmarked' : 'Bookmark'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetailsPage;