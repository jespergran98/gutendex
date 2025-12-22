import React, { useState } from 'react';
import FilterButton from '../../components/FilterButton/FilterButton';
import SortButton from '../../components/SortButton/SortButton';
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import BookGrid from '../../components/BookGrid/BookGrid';
import TabBar from '../../components/TabBar/TabBar';
import './HomePage.css';

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="home-page">
      <div className="background-blur"></div>
      
      <div className="home-container">
        <header className="home-header">
          <div className="header-actions">
            <FilterButton />
            <SortButton />
          </div>
          
          <div className="header-search">
            <SearchBar />
          </div>
        </header>
        
        <section className="category-section">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </section>
        
        <main className="content-area">
          <BookGrid selectedCategory={selectedCategory} />
        </main>
      </div>
      
      <TabBar />
    </div>
  );
}

export default HomePage;