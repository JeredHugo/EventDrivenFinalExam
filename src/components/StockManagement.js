// StockManagement.js

import React, { useState } from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import './StockManagement.css';

const StockManagement = ({ products, updateProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [newStock, setNewStock] = useState('');

  const handleUpdateStock = () => {
    const updatedProducts = [...products];
    const updatedProductIndex = updatedProducts.findIndex((p) => p.name === selectedProduct);

    if (updatedProductIndex !== -1) {
      const newStockValue = parseInt(newStock, 10);

      if (isNaN(newStockValue)) {
        
        alert('Please enter a valid whole number for new stock.');
        return;
      }

      updatedProducts[updatedProductIndex].stock = newStockValue;
      updateProducts(updatedProducts);

      
      setSelectedProduct('');
      setNewStock('');
    }
  };

  return (
    <div className="stock-management-container">
      <div className="stock-management-form">
        <h2>Stock Management</h2>
        <label htmlFor="product">Select Product:</label>
        <select id="product" onChange={(e) => setSelectedProduct(e.target.value)}>
          <option value="">--Select Product--</option>
          {products.map((product) => (
            <option key={product.id} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>

        <label htmlFor="newStock">New Stock:</label>
        <div className="floating-input">
          <input type="number" id="newStock" value={newStock} onChange={(e) => setNewStock(e.target.value)} />
          <BsArrowUpRight className="arrow-icon" />
        </div>

        <button className="update-button" onClick={handleUpdateStock}>
          Update Stock
        </button>
      </div>
    </div>
  );
};

export default StockManagement;