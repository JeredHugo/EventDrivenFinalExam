// Sidebar.js
import React from 'react';
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill }
 from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar, onProductsClick, onCategoriesClick, onTransactionsClick, onStocksClick, onDashboardClick, onReportsClick }) {
  console.log('Sidebar component rendered');

  const handleCategoriesClick = () => {
    console.log('Categories link clicked in Sidebar');
    onCategoriesClick();  
  };

  const handleDashboardClick = (e) => {
    e.preventDefault();
    console.log('Dashboard icon clicked in Sidebar');
    onDashboardClick();
  };

  const handleTransactionsClick = () => {
    console.log('Transactions link clicked in Sidebar');
    onTransactionsClick();  
  };

  const handleStocksClick = () => {
    console.log('Stocks link clicked in Sidebar');
    onStocksClick();  
  };

  const handleReportsClick = () => {
    console.log('Reports link clicked in Sidebar');
    onReportsClick();  
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsCart3 className='icon_header'/> GROUP 2 SHOP
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <a href="/dashboard" onClick={handleDashboardClick}>
            <BsGrid1X2Fill className='icon'/> Dashboard
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="#" onClick={onProductsClick}>
            <BsFillArchiveFill className='icon'/> Products
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="#" onClick={() => handleCategoriesClick()}>
            <BsFillGrid3X3GapFill className='icon'/> Categories
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="#" onClick={handleTransactionsClick}>
            <BsPeopleFill className='icon'/> Transactions
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="#" onClick={handleStocksClick}>
            <BsListCheck className='icon'/> Stocks
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="#" onClick={handleReportsClick}>
            <BsMenuButtonWideFill className='icon'/> Reports
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <BsFillGearFill className='icon'/> Setting
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;