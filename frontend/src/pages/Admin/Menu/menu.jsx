import styles from './menu.module.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'; // empty star
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'; // filled star

function Menu() {
  const [meals, setMeals] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [mealToDelete, setMealToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editMeal, setEditMeal] = useState(null);
  const [editFileName, setEditFileName] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [newMeal, setNewMeal] = useState({
    name: '',
    description: '',
    img: '',
    category: '',
    fileName: '',
    price: ''
  });
  const [notification, setNotification] = useState({ show: false, message: '' });

  const fetchMeals = async () => {
    try {
      const response = await fetch("http://localhost:3000/menu");
      const data = await response.json();
      setMeals(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleAdd = async () => {
    // Validate all fields
    const errors = {};
    if (!newMeal.name.trim()) errors.name = 'Name is required';
    if (!newMeal.description.trim()) errors.description = 'Description is required';
    if (!newMeal.img.trim()) errors.img = 'Image is required';
    if (!newMeal.category.trim()) errors.category = 'Category is required';

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/meal/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMeal),
      });
      const data = await response.json();
      setMeals([...meals, data]);
      setShowAddModal(false);
      setNewMeal({ name: '', description: '', img: '', category: '', fileName: '' });
      setValidationErrors({});
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeal(prev => ({
      ...prev,
      [name]: value
    }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const handleFileReceive = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'tokyobites-upload');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dqxeupx0u/image/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      if (response.ok && data.secure_url) {
        setNewMeal(prev => ({
          ...prev,
          img: data.secure_url,
          fileName: file.name
        }));
        // Clear any existing image validation error
        setValidationErrors(prev => ({
          ...prev,
          img: ''
        }));
      } else {
        console.error('Failed to upload image:', data);
        setValidationErrors(prev => ({
          ...prev,
          img: data.error?.message || 'Failed to upload image. Please try again.'
        }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setValidationErrors(prev => ({
        ...prev,
        img: 'Error uploading image. Please try again.'
      }));
    }
  };
  const handleDelete = async (id) => {
    const meal = meals.find(m => m._id === id);
    setMealToDelete(meal);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/meal/${mealToDelete._id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setMeals(meals.filter(meal => meal._id !== mealToDelete._id));
        setShowDeleteModal(false);
        setMealToDelete(null);
      } else {
        console.error("Failed to delete meal");
      }
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditMeal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditFileReceive = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'tokyobites-upload');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dqxeupx0u/image/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      if (response.ok && data.secure_url) {
        setEditMeal(prev => ({
          ...prev,
          img: data.secure_url
        }));
        setEditFileName(file.name);
      } else {
        console.error('Failed to upload image:', data);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleEditSave = () => {
    handleEdit(editMeal);
  };

  const handleEdit = async (meal) => {
    try {
      const { _id, __v, ...mealData } = meal;
      const response = await fetch(`http://localhost:3000/api/meal/${_id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mealData)
      });
      
      if (response.ok) {
        const updatedMeal = await response.json();
        setMeals(meals.map(m => m._id === _id ? updatedMeal.meal : m));
        setShowEditModal(false);
        setEditMeal(null);
      } else {
        const errorData = await response.json();
        console.error(`Failed to update meal: ${errorData.message || 'Unknown error'}`);
        alert(`Failed to update meal: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error updating meal:", error.message);
      alert(`Error updating meal: ${error.message}`);
    }
  };

  const handleEditClick = (meal) => {
    setEditMeal(meal);
    setEditFileName('');
    setShowEditModal(true);
  };

  const getHighlightedCountInCategory = (category) => {
    return meals.filter(meal => meal.category === category && meal.highlight).length;
  };

  const toggleHighlight = async (mealId, currentHighlight, category) => {
    if (!currentHighlight) {
        const highlightedCount = getHighlightedCountInCategory(category);
        if (highlightedCount >= 4) {
            setNotification({
                show: true,
                message: `Cannot highlight more than 4 meals in the ${category} category`
            });
            
            setTimeout(() => {
                setNotification({ show: false, message: '' });
            }, 3000);
            
            return;
        }
    }

    try {
        const response = await fetch(`http://localhost:3000/api/meal/${mealId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ highlight: !currentHighlight })
        });

        if (response.ok) {
            setMeals(meals.map(meal => 
                meal._id === mealId 
                    ? { ...meal, highlight: !meal.highlight }
                    : meal
            ));
        }
    } catch (error) {
        console.error('Error updating highlight status:', error);
    }
  };

  return (
    <div className={styles.container}>
      {notification.show && (
        <div className={styles.notification}>
          {notification.message}
        </div>
      )}
      <div className={styles.header}>
        <button onClick={() => setShowAddModal(true)} className={styles.buttonAdd}>Add</button>
        <div className={styles.searchBar}>
          <select 
            className={styles.input}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="appetizers">Appetizers</option>
            <option value="maki">Maki</option>
            <option value="sushi">Sushi</option>
            <option value="sashimi">Sashimi</option>
            <option value="ramen">Ramen</option>
            <option value="dessert">Dessert</option>
            <option value="softdrinks">Soft Drinks</option>
            <option value="alcohol">Alcohol</option>
            <option value="salads">Salads</option>
          </select>
      </div>
      </div>
      {showAddModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Add New Product</h2>
            <div className={styles.formGroup}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={newMeal.name}
                onChange={handleInputChange}
                className={validationErrors.name ? styles.inputError : ''}
              />
              {validationErrors.name && <span className={styles.errorMessage}>{validationErrors.name}</span>}
            </div>
            <div className={styles.formGroup}>
              <label>Description:</label>
              <textarea
                name="description"
                value={newMeal.description}
                onChange={handleInputChange}
                className={validationErrors.description ? styles.inputError : ''}
              />
              {validationErrors.description && <span className={styles.errorMessage}>{validationErrors.description}</span>}
            </div>
            <div className={styles.formGroup}>
              <label>Image:</label>
              <div className={styles.fileInputContainer}>
                <label className={styles.fileInputLabel}>
                  {newMeal.fileName || 'Choose Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileReceive}
                    className={validationErrors.img ? styles.inputError : ''}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
              {validationErrors.img && <span className={styles.errorMessage}>{validationErrors.img}</span>}
            </div>
            <div className={styles.formGroup}>
              <label>Category:</label>
              <select
                name="category"
                value={newMeal.category}
                onChange={handleInputChange}
                className={validationErrors.category ? styles.inputError : ''}
              >
                <option value="">Select Category</option>
                <option value="appetizers">Appetizers</option>
                <option value="maki">Maki</option>
                <option value="sushi">Sushi</option>
                <option value="sashimi">Sashimi</option>
                <option value="ramen">Ramen</option>
                <option value="dessert">Dessert</option>
                <option value="softdrinks">Soft Drinks</option>
                <option value="alcohol">Alcohol</option>
                <option value="salads">Salads</option>
              </select>
              {validationErrors.category && <span className={styles.errorMessage}>{validationErrors.category}</span>}
            </div>
            <div className={styles.formGroup}>
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={newMeal.price}
                onChange={handleInputChange}
                className={validationErrors.price ? styles.inputError : ''}
              />
              {validationErrors.price && <span className={styles.errorMessage}>{validationErrors.price}</span>}
            </div>
            
            <div className={styles.modalButtons}>
              <button onClick={handleAdd}>Save</button>
              <button onClick={() => {
                setShowAddModal(false);
                setNewMeal({ name: '', description: '', img: '', category: '', fileName: '', price: '' });
                setValidationErrors({});
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Edit Meal</h2>
            <div className={styles.formGroup}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editMeal?.name || ''}
                onChange={handleEditChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Description:</label>
              <textarea
                name="description"
                value={editMeal?.description || ''}
                onChange={handleEditChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Image:</label>
              <div className={styles.fileInputContainer}>
                <label className={styles.fileInputLabel}>
                  {editFileName || 'Choose Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleEditFileReceive}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Category:</label>
              <select
                name="category"
                value={editMeal?.category || ''}
                onChange={handleEditChange}
              >
                <option value="">Select Category</option>
                <option value="appetizers">Appetizers</option>
                <option value="maki">Maki</option>
                <option value="sushi">Sushi</option>
                <option value="sashimi">Sashimi</option>
                <option value="ramen">Ramen</option>
                <option value="dessert">Dessert</option>
                <option value="softdrinks">Soft Drinks</option>
                <option value="alcohol">Alcohol</option>
                <option value="salads">Salads</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={editMeal?.price || ''}
                onChange={handleEditChange}
              />
            </div>
            
            <div className={styles.modalButtons}>
              <button onClick={handleEditSave}>Save</button>
              <button onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete "{mealToDelete?.name}"?</p>
            <div className={styles.modalButtons}>
              <button onClick={confirmDelete} className={styles.buttonDelete}>Yes, Delete</button>
              <button onClick={() => {
                setShowDeleteModal(false);
                setMealToDelete(null);
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.menuItems}>
        {meals
          .filter(meal => !selectedCategory || meal.category === selectedCategory)
          .map((meal) => (
            <div key={meal._id} className={styles.card}>
                <div className={styles.favoriteButton} onClick={(e) => {
                    e.stopPropagation();
                    toggleHighlight(meal._id, meal.highlight, meal.category);
                }}>
                    <FontAwesomeIcon 
                        icon={meal.highlight ? fasStar : farStar}
                        className={styles.starIcon}
                    />
                </div>
                <p className={styles.card__price}>
                  {Number(meal.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </p>
                <img src={meal.img} alt={meal.name} className={styles.card__image} />
                <div className={styles.card__content}>
                    <p className={styles.card__title}>{meal.name}</p>
                    <p className={styles.card__description}>{meal.description}</p>
                    <button onClick={() => handleEditClick(meal)} className={styles.buttonEdit}>Edit</button>
                    <button onClick={() => handleDelete(meal._id)} className={styles.buttonDelete}>Delete</button>
                </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Menu;
