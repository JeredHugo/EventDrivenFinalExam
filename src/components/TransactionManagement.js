// TransactionManagement.js
import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './TransactionManagement.css';

const TransactionManagement = ({ products, updateProducts, transactionHistory, setTransactionHistory }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    updateProducts(savedProducts);
  }, [updateProducts]);

  const handleTransaction = () => {
    if (!selectedProduct) {
      alert('Please select a product before making a transaction.');
      return;
    }

    const product = products.find((p) => p.name === selectedProduct);
    const availableStock = product ? parseFloat(product.stock) : 0;  
  
    if (product && availableStock >= quantity) {
      const updatedProducts = [...products];
      const updatedProductIndex = updatedProducts.findIndex((p) => p.name === selectedProduct);
      updatedProducts[updatedProductIndex].stock = (availableStock - quantity) + ' in stocks';  

      
      if (availableStock - quantity === 0) {
        updatedProducts.splice(updatedProductIndex, 1);
      }

      updateProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));

      
      const totalPrice = parseFloat(product.price) * quantity;

     
      const transactionDetails = {
        productName: selectedProduct,
        quantity: quantity,
        totalPrice: totalPrice,
        time: new Date().toLocaleString(),
      };

      
      setTransactionHistory([...transactionHistory, transactionDetails]);

      
      window.alert('Item bought successfully!');
    } else {
      alert('Not enough stock for the selected product.');
    }
  };

  return (
    <div className="transaction-management">
      <h2>Transaction Management</h2>
      <label htmlFor="product">Select Product:</label>
      <select id="product" onChange={(e) => setSelectedProduct(e.target.value)}>
        <option value="">--Select Product--</option>
        {products.map((product) => (
          <option key={product.id} value={product.name}>
            {product.name}
          </option>
        ))}
      </select>

      <label htmlFor="quantity">Quantity:</label>
      <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

      <button onClick={handleTransaction}>
        <FaShoppingCart /> Make Transaction
      </button>
    </div>
  );
};

export default TransactionManagement;