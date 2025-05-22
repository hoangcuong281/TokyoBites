import { useEffect, useState } from 'react';
import styles from './MenuContent.module.css';

function MenuContent({ selectedCategory, onCategoryChange }) {
    const [meals, setMeals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchActive, setSearchActive] = useState(false);

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

    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            setSearchActive(true);
            if (selectedCategory !== 'all' && onCategoryChange) {
                onCategoryChange('all');
            }
        } else {
            setSearchActive(false);
        }
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === '') setSearchActive(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    
    const filteredMeals = meals.filter(meal => {
        const isDrinkCategory = selectedCategory === 'drinks'
            ? meal.category === 'softdrinks' || meal.category === 'alcohol'
            : meal.category === selectedCategory;

        if (searchActive) {
            return (
                (selectedCategory === 'all' || isDrinkCategory) &&
                meal.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return selectedCategory === 'all' || isDrinkCategory;
    });

    return (
        <div className={styles.menuRight}>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Search for a meal..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSearch}>
                    Search
                </button>
            </div>
            <div className={styles.menuItems}>
                {filteredMeals.length > 0 ? (
                    filteredMeals.map((meal) => (
                        <div key={meal.id || meal.name} className={styles.card} style={{ backgroundImage: `url(${meal.img})` }}>
                            <div className={styles.card__content}>
                                <p className={styles.card__title}>{meal.name}</p>
                                <p className={styles.card__description}>{meal.description}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No meals found.</p>
                )}
            </div>
        </div>
    );
}

export default MenuContent;