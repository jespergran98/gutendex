import React, { useState } from 'react';
import './CategoryFilter.css';

const categories = [
  'All',
  'Fiction',
  'Mystery',
  'Thriller',
  'Romance',
  'Fantasy',
  'Morality',
  'Society',
  'Power',
  'Justice',
  'Adventure',
  'Tragedy',
  'War',
  'Philosophy'
];

function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="category-filter">
      <div className="category-list">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-item ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;