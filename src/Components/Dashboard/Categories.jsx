import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Food' },
    { id: 2, name: 'Transport' },
    { id: 3, name: 'Entertainment' }
  ]); // Mock data
  const [newCategory, setNewCategory] = useState('');
  const [categoryToUpdate, setCategoryToUpdate] = useState(null); // Track which category to update
  const [newCategoryName, setNewCategoryName] = useState(''); // Store updated category name
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock token for testing
  const token = 'mock-token-123456789'; // This is your mock JWT token

  useEffect(() => {
    // TODO: Replace mock data with API fetch later
    // fetchCategories();
  }, []);

  // Function to fetch categories from API
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://your-api-endpoint.com/categories', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (error) {
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  // Add a category (Mock now, API later)
  const addCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      const newCat = { id: categories.length + 1, name: newCategory };
      setCategories([...categories, newCat]);

      // TODO: Replace with API call later
      // await axios.post('https://your-api-endpoint.com/categories', { name: newCategory }, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });

      setNewCategory('');
    } catch (error) {
      setError('Failed to add category');
    }
  };

  // Update a category (Mock now, API later)
  const updateCategory = async (id) => {
    if (!newCategoryName.trim()) return;

    try {
      setCategories(categories.map((category) =>
        category.id === id ? { ...category, name: newCategoryName } : category
      ));

      // TODO: Replace with API call later
      // await axios.put(`https://your-api-endpoint.com/categories/${id}`, { name: newCategoryName }, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });

      setCategoryToUpdate(null); // Hide the update input field
      setNewCategoryName(''); // Clear the input
    } catch (error) {
      setError('Failed to update category');
    }
  };

  // Delete a category (Mock now, API later)
  const deleteCategory = async (id) => {
    try {
      setCategories(categories.filter((category) => category.id !== id));

      // TODO: Replace with API call later
      // await axios.delete(`https://your-api-endpoint.com/categories/${id}`, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
    } catch (error) {
      setError('Failed to delete category');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="categories-container">
      <h2>Manage Categories</h2>

      {/* Add New Category */}
      <div className="add-category">
        <input
          type="text"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={addCategory}>Add Category</button>
      </div>

      {/* Category List */}
      

      <ul className="category-list">
        {categories.map((category) => (
          <li key={category.id}>
            {/* Category Name on the Left */}
            <div className="category-name">
              {categoryToUpdate === category.id ? (
                // Show input field when updating
                <input
                  type="text"
                  placeholder="New category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              ) : (
                // Show category name when not updating
                <span>{category.name}</span>
              )}
            </div>

            {/* Buttons on the Right */}
            <div>
              {categoryToUpdate === category.id ? (
                // Show Save and Cancel buttons when updating
                <>
                  <button
                    className="save-btn"
                    onClick={() => updateCategory(category.id)}
                  >
                    Save
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => {
                      setCategoryToUpdate(null); // Hide the update input field
                      setNewCategoryName(''); // Clear the input
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                // Show Update and Delete buttons when not updating
                <>
                  <button
                    className="update-btn"
                    onClick={() => {
                      setCategoryToUpdate(category.id); // Show the update input field
                      setNewCategoryName(category.name); // Pre-fill the input with the current category name
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteCategory(category.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>


    </div>
  );
};

export default Categories;
