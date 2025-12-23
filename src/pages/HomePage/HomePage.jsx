import React, { useState } from 'react';
import FilterButton from '../../components/FilterButton/FilterButton';
import SortButton from '../../components/SortButton/SortButton';
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import BookGrid from '../../components/BookGrid/BookGrid';
import BookmarkedPage from '../BookmarkedPage/BookmarkedPage';
import TabBar from '../../components/TabBar/TabBar';
import FilterModal from '../../components/FilterModal/FilterModal';
import SortModal from '../../components/SortModal/SortModal';
import './HomePage.css';

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('explore');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

  return (
    <div className="home-page">
      <div className="background-blur"></div>
      
      <div className="home-container">
        {activeTab === 'explore' ? (
          <>
            <header className="home-header">
              <div className="header-actions">
                <FilterButton onClick={() => setIsFilterModalOpen(true)} />
                <SortButton onClick={() => setIsSortModalOpen(true)} />
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
          </>
        ) : (
          <main className="content-area">
            <BookmarkedPage />
          </main>
        )}
      </div>
      
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <FilterModal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)} 
      />
      <SortModal 
        isOpen={isSortModalOpen} 
        onClose={() => setIsSortModalOpen(false)} 
      />
    </div>
  );
}

export default HomePage;