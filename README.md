# Gutendex Library

A modern web application for browsing and discovering books from Project Gutenberg's collection.

![Gutendex Library Screenshot](public/assets/website.png)

## Core Functionality

### Browse & Explore

- View thousands of free books from the Project Gutenberg library
- Infinite scroll with "Load More" pagination
- Beautiful card-based grid layout with book covers

### Search

- Search books by title or author name
- Real-time search results

### Filter

- **Author Birth Year**: Filter books by author's birth year range
- **Language**: Filter by 20+ languages including English, French, German, Spanish, and more

### Sort

Sort books by:

- **Popularity**: Most/least downloaded books
- **Title**: Alphabetical order
- **Author**: By author name
- **Author Birth Year**: By author's birth year
- **Book ID**: Newest/oldest additions

### Categories

Quick filter by topic:

- Fiction, Mystery, Thriller, Romance, Fantasy
- Philosophy, Society, Morality, Justice, Power
- Adventure, War, Tragedy

### Bookmarks

- Save favorite books for later
- Access bookmarked books from dedicated tab
- Bookmarks persist across sessions

### Book Details

- Click any book to view full details
- See author information, download counts, and available formats

## Navigation

- **Explore Tab**: Browse the full library with all filters and search
- **Bookmarked Tab**: View your saved books

## Data Source

All book data is provided by the [Gutendex API](https://gutendex.com), a JSON web API for Project Gutenberg's ebook metadata.

## Project Structure

```ini
gutendex/
├── node_modules/
├── public/
│   ├── flags/
│   └── assets/
│       ├── background.webp
│       ├── favicon.png
│       └── website.png
│
├── src/
│   ├── components/
│   │   ├── BookCard/
│   │   │   ├── BookCard.css
│   │   │   └── BookCard.jsx
│   │   │
│   │   ├── BookGrid/
│   │   │   ├── BookGrid.css
│   │   │   └── BookGrid.jsx
│   │   │
│   │   ├── CategoryFilter/
│   │   │   ├── CategoryFilter.css
│   │   │   └── CategoryFilter.jsx
│   │   │
│   │   ├── FilterButton/
│   │   │   ├── FilterButton.css
│   │   │   └── FilterButton.jsx
│   │   │
│   │   ├── FilterModal/
│   │   │   ├── FilterModal.css
│   │   │   └── FilterModal.jsx
│   │   │
│   │   ├── GutendexTitle/
│   │   │   ├── GutendexTitle.css
│   │   │   └── GutendexTitle.jsx
│   │   │
│   │   ├── SearchBar/
│   │   │   ├── SearchBar.css
│   │   │   └── SearchBar.jsx
│   │   │
│   │   ├── SortButton/
│   │   │   ├── SortButton.css
│   │   │   └── SortButton.jsx
│   │   │
│   │   ├── SortModal/
│   │   │   ├── SortModal.css
│   │   │   └── SortModal.jsx
│   │   │
│   │   └── TabBar/
│   │       ├── TabBar.css
│   │       └── TabBar.jsx
│   │
│   ├── context/
│   │   ├── BookmarkContext.jsx
│   │   ├── FilterContext.jsx
│   │   ├── SearchContext.jsx
│   │   └── SortContext.jsx
│   │
│   ├── pages/
│   │   ├── BookmarkedPage/
│   │   │   ├── BookmarkedPage.css
│   │   │   └── BookmarkedPage.jsx
│   │   │
│   │   └── HomePage/
│   │       ├── HomePage.css
│   │       └── HomePage.jsx
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── zNotes/
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.ts
```

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
