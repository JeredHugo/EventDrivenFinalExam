// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import ProductManagement from './components/ProductManagement';
import CategoryManagement from './components/CategoryManagement';
import TransactionManagement from './components/TransactionManagement';
import StockManagement from './components/StockManagement';
import ReportManagement from './components/ReportManagement';  

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showProductManagement, setShowProductManagement] = useState(false);
  const [showCategoryManagement, setShowCategoryManagement] = useState(false);
  const [showTransactionManagement, setShowTransactionManagement] = useState(false);
  const [showStockManagement, setShowStockManagement] = useState(false);
  const [showReportManagement, setShowReportManagement] = useState(false);  
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productTableData, setProductTableData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockManagementProducts, setStockManagementProducts] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);  

  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setCategories(savedCategories);
    setProducts(savedProducts);
    setProductTableData(savedProducts.map(({ id, name, category, price, stock }) => ({ id, name, category, price, stock })));
  }, []);

  const updateCategories = (updatedCategories) => {
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  const updateProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    setProductTableData(updatedProducts.map(({ id, name, category, price, stock }) => ({ id, name, category, price, stock })));
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const updateCategoriesFromProduct = (newCategory, oldCategory) => {
    const updatedCategories = [...categories];
    const index = updatedCategories.indexOf(oldCategory);
    if (index !== -1) {
      updatedCategories[index] = newCategory;
      setCategories(updatedCategories);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
    }
  };

  const updateStocks = (updatedStocks) => {
    console.log('Stocks updated:', updatedStocks);
  };

  const onProductAdd = (newProduct) => {
    console.log('Product added:', newProduct);
  };

  const onProductSelect = (product) => {
    console.log('Selected Product:', product);
    setSelectedProduct(product);
  };

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleDashboardClick = () => {
    setShowDashboard(true);
    setShowProductManagement(false);
    setShowCategoryManagement(false);
    setShowTransactionManagement(false);
    setShowStockManagement(false);
    setShowReportManagement(false);  
  };

  const handleProductsClick = () => {
    setShowDashboard(false);
    setShowProductManagement(true);
    setShowCategoryManagement(false);
    setShowTransactionManagement(false);
    setShowStockManagement(false);
    setShowReportManagement(false);  
  };

  const handleCategoriesClick = () => {
    setShowDashboard(false);
    setShowCategoryManagement(true);
    setShowProductManagement(false);
    setShowTransactionManagement(false);
    setShowStockManagement(false);
    setShowReportManagement(false);  
  };

  const handleTransactionsClick = () => {
    setShowDashboard(false);
    setShowProductManagement(false);
    setShowCategoryManagement(false);
    setShowTransactionManagement(true);
    setShowStockManagement(false);
    setShowReportManagement(false);  
  };

  const handleStocksClick = () => {
    setShowDashboard(false);
    setShowProductManagement(false);
    setShowCategoryManagement(false);
    setShowTransactionManagement(false);
    setShowStockManagement(true);
    setShowReportManagement(false);  
  };

  const handleReportsClick = () => {
    setShowDashboard(false);
    setShowProductManagement(false);
    setShowCategoryManagement(false);
    setShowTransactionManagement(false);
    setShowStockManagement(false);
    setShowReportManagement(true);  
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} onDashboardClick={handleDashboardClick} onProductsClick={handleProductsClick} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        onDashboardClick={handleDashboardClick}
        onProductsClick={handleProductsClick}
        onCategoriesClick={handleCategoriesClick}
        onTransactionsClick={handleTransactionsClick}
        onStocksClick={handleStocksClick}
        onReportsClick={handleReportsClick}  
      />
      <div className='content-container'>
        {showDashboard && <Home categories={categories} products={products} updateCategories={updateCategories} updateProducts={updateProducts} updateCategoriesFromProduct={updateCategoriesFromProduct} selectedProduct={selectedProduct} productTableData={productTableData} />}
        {showProductManagement && <ProductManagement categories={categories} updateCategories={updateCategories} updateCategoriesFromProduct={updateCategoriesFromProduct} updateStocks={updateStocks} onProductAdd={onProductAdd} onProductSelect={onProductSelect} />}
        {showCategoryManagement && <CategoryManagement categories={categories} updateCategories={updateCategories} />}
        {showTransactionManagement && <TransactionManagement products={products} updateProducts={updateProducts} transactionHistory={transactionHistory} setTransactionHistory={setTransactionHistory} />}
        {showStockManagement && (
          <StockManagement
            products={products}
            updateProducts={updateProducts}
            stockManagementProducts={stockManagementProducts}
            setStockManagementProducts={setStockManagementProducts}
            updateStocks={updateStocks}
          />
        )}
        {showReportManagement && <ReportManagement transactionHistory={transactionHistory} />} 
      </div>
    </div>
  );
}

export default App;