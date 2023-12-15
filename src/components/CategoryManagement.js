// CategoryManagement.js
import React, { useState } from 'react';
import './CategoryManagement.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const CategoryManagement = ({ categories, updateCategories }) => {
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const addCategory = () => {
    if (!newCategory) {
      return;
    }

    if (isEditing) {
      const updatedCategories = [...categories];
      updatedCategories[selectedCategory] = newCategory;
      updateCategories(updatedCategories);
      setNewCategory('');
      setIsEditing(false);
      setSelectedCategory('');
    } else {
      updateCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const editCategory = (index) => {
    setNewCategory(categories[index]);
    setSelectedCategory(index);
    setIsEditing(true);
  };

  const deleteCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    updateCategories(updatedCategories);
  };

  return (
    <div className="category-management">
      <div className="form-container">
        <h2 className="mb-4">Edit Category</h2>
        <form>
          <label htmlFor="newCategory">Edit Category *</label>
          <input type="text" id="newCategory" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
          <button type="button" onClick={addCategory}>
            {isEditing ? 'Update Category' : 'Add Category'}
          </button>
        </form>
      </div>

      <div className="category-list">
        <h2 className="mb-4">Category List</h2>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td>{category}</td>
                <td>
                  <button type="button" onClick={() => editCategory(index)}><FaEdit /> Edit </button>{' '}
                  <button className="delete-btn" type="button" onClick={() => deleteCategory(index)}> <FaTrash />Delete </button> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryManagement;