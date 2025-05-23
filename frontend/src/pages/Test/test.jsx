import styles from './test.module.css';
import { useEffect, useState } from 'react';

function Test() {
  const [meals, setMeals] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [newMeal, setNewMeal] = useState({
    name: '',
    description: '',
    img: '',
    category: '',
    fileName: ''
  });

  const fetchMeals = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/meal");
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
    if (!newMeal.img) errors.img = 'Please select an image';
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
    // Clear validation error when user starts typing
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

  return (
    <div className={styles.container}>
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
            <option value="drinks">Drinks</option>
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
              <input
                type="text"
                name="category"
                value={newMeal.category}
                onChange={handleInputChange}
                className={validationErrors.category ? styles.inputError : ''}
              />
              {validationErrors.category && <span className={styles.errorMessage}>{validationErrors.category}</span>}
            </div>
            <div className={styles.modalButtons}>
              <button onClick={handleAdd}>Save</button>
              <button onClick={() => {
                setShowAddModal(false);
                setNewMeal({ name: '', description: '', img: '', category: '', fileName: '' });
                setValidationErrors({});
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
                <img src={meal.img} alt={meal.name} className={styles.card__image} />
                <div className={styles.card__content}>
                  <p className={styles.card__title}>{meal.name}</p>
                  <p className={styles.card__description}>{meal.description}</p>
  
                </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Test;
