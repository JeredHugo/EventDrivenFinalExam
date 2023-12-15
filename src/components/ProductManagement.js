import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ProductManagement.css';

const ProductManagement = ({ categories, updateCategories, updateCategoriesFromProduct, updateStocks, onProductSelect, onProductAdd }) => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productStock, setProductStock] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [productCategory, setProductCategory] = useState('--Select Category--');
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(savedProducts);
  }, []);

  const validateAndAddProduct = () => {
    if (
      !productName ||
      productCategory === '--Select Category--' ||
      !productPrice ||
      !productStock
    ) {
      alert('Please fill in all fields.');
      return;
    }

    
    const price = parseInt(productPrice);
    const stock = parseInt(productStock);

    if (isNaN(price) || isNaN(stock)) {
      alert('Price and Stock must be integers.');
      return;
    }

    const newProduct = {
      id: selectedProductIndex !== null ? products[selectedProductIndex].id : generateNewProductId(),
      name: productName,
      category: productCategory,
      price: price.toFixed(2),
      stock: `${stock} in stocks`,
    };

    if (selectedProductIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[selectedProductIndex] = newProduct;
      setProducts(updatedProducts);
      setSelectedProductIndex(null);

      updateStocks(calculateUpdatedStocks(updatedProducts, productCategory));

      localStorage.setItem('products', JSON.stringify(updatedProducts));

      alert('Successfully updated product.');
    } else {
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      updateCategoriesFromProduct(productCategory);

      updateStocks(calculateUpdatedStocks([...products, newProduct], productCategory));

      localStorage.setItem('products', JSON.stringify([...products, newProduct]));

      onProductAdd(newProduct);
      alert('Successfully added product.');
    }

    setProductName('');
    setProductCategory('--Select Category--');
    setProductPrice('');
    setProductStock('');

    
    onProductSelect({
      id: newProduct.id,
      name: newProduct.name,
      category: newProduct.category,
      price: newProduct.price,
      stock: newProduct.stock,
    });
  };

  const generateNewProductId = () => {
    const existingIds = products.map((product) => product.id);
    const newId = Math.max(...existingIds, 0) + 1;
    return newId;
  };

  const addCategory = () => {
    if (!newCategory || categories.includes(newCategory)) {
      return;
    }

    updateCategories([...categories, newCategory]);
    updateCategoriesFromProduct(newCategory);
    setNewCategory('');
    alert('Successfully added category.');
  };

  const calculateUpdatedStocks = (updatedProducts, updatedCategory) => {
    const stockData = {};

    updatedProducts.forEach((product) => {
      if (!stockData[product.category]) {
        stockData[product.category] = 0;
      }

      
      const stockValue = typeof product.stock === 'string' ? parseInt(product.stock.split(' ')[0]) : parseInt(product.stock);
      
      
      if (!isNaN(stockValue)) {
        stockData[product.category] += stockValue;
      }
    });

    return stockData;
  };

  const editProduct = (index) => {
    const selectedProduct = products[index];
    setProductName(selectedProduct.name);
    setProductCategory(selectedProduct.category);
    setProductPrice(selectedProduct.price);
    setProductStock(typeof selectedProduct.stock === 'string' ? selectedProduct.stock.split(' ')[0] : selectedProduct.stock);
    setSelectedProductIndex(index);
  };

  const deleteProduct = (index) => {
    const updatedProducts = [...products];
    const deletedProduct = updatedProducts.splice(index, 1)[0];
    setProducts(updatedProducts);
    setSelectedProductIndex(null);

    updateStocks(calculateUpdatedStocks(updatedProducts, productCategory));

    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  return (
    <div className="product-management">
      <div className="form-container">
        <h2 className="mb-4">Product Management</h2>
        <form>
          <label htmlFor="productName">Product Name *</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />

          <label htmlFor="productCategory">Category *</label>
          <select
            id="productCategory"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          >
            <option>--Select Category--</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <label htmlFor="productPrice">Price *</label>
          <input
            type="number"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
            step="1" 
          />

          <label htmlFor="productStock">Stock *</label>
          <input
            type="number"
            id="productStock"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
            required
            step="1"
          />

          <button type="button" onClick={validateAndAddProduct}>
            {selectedProductIndex !== null ? 'Update' : 'Save'}
          </button>
        </form>

        <div>
          <label htmlFor="newCategory">New Category</label>
          <input
            type="text"
            id="newCategory"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button type="button" onClick={addCategory}>
            Add Category
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>₱{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button type="button" className="update" onClick={() => editProduct(index)}>
                  <FaEdit />
                  Update
                </button>
                <button type="button" className="delete" onClick={() => deleteProduct(index)}>
                  <FaTrash />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
