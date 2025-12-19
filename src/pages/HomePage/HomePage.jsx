import React from 'react';
import FilterButton from '../../components/FilterButton/FilterButton';
import SortButton from '../../components/SortButton/SortButton';
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import TabBar from '../../components/TabBar/TabBar';
import './HomePage.css';

function HomePage() {
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
          <CategoryFilter />
        </section>
        
        <main className="content-area">
          {/* Content will be added here later */}
        </main>
      </div>
      
      <TabBar />
    </div>
  );
}

export default HomePage;