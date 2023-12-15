// Home.jsx
import React from 'react';
import ProductManagement from './ProductManagement';
import CategoryManagement from './CategoryManagement';  // Import CategoryManagement

const Home = ({ showProductManagement, showCategoryManagement, categories, updateCategories, updateCategoriesFromProduct }) => {
  const getViewMessage = () => {
    if (showProductManagement) {
      return '';
    } else if (showCategoryManagement) {
      return '';
    } else {
      return '';
    }
  };

  return (
    <div className='main-container'>
      <h1>{getViewMessage()}</h1>
      {showProductManagement && (
        <ProductManagement
          categories={categories}
          updateCategories={updateCategories}
          updateCategoriesFromProduct={updateCategoriesFromProduct}
        />
      )}
      {showCategoryManagement && (
        <CategoryManagement
          categories={categories}
          updateCategories={updateCategories}
        />
      )}
    </div>
  );
};

export default Home;