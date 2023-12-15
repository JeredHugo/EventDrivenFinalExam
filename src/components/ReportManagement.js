// ReportManagement.js
import React from 'react';
import './ReportManagement.css'; 

const ReportManagement = ({ transactionHistory }) => {
  return (
    <div className="report-management">
      <h2>Transaction Reports</h2>

      <div className="transaction-history">
        <table className="report-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {transactionHistory.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.productName}</td>
                <td>{transaction.quantity}</td>
                <td>₱{transaction.totalPrice.toFixed(2)}</td>
                <td>{transaction.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportManagement;
