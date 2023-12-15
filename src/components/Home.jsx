// Home.jsx
import React, { useState, useEffect } from 'react';
import './Home.css'; 

const Home = ({ categories, products }) => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);

  useEffect(() => {
    
    const productsCount = products.length;

    
    const categoriesCount = categories.length;

    setTotalProducts(productsCount);
    setTotalCategories(categoriesCount);
  }, [products, categories]);

  return (
    <div className='main-container'>
      <div className='dashboard-header'>
        <h1>Welcome to the Dashboard</h1>
      </div>

      <div className='dashboard-stats'>
        <div className='stat-card'>
          <h2>Total Products</h2>
          <p className='stat-number'>{totalProducts}</p>
        </div>
        <div className='stat-card'>
          <h2>Total Categories</h2>
          <p className='stat-number'>{totalCategories}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;