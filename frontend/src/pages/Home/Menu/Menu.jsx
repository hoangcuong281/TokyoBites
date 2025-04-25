import styles from './Menu.module.css';
import BiaHaNoi from '../../../assets/BiaHaNoi.png';
import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

function Menu(){
    const [meals, setMeals] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('maki');
    const [selectedDrinkCategory, setSelectedDrinkCategory] = useState('softdrinks');
    const [currentDrinkIndex, setCurrentDrinkIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState('right');

    const fetchMeals = async () => {
        const response = await fetch('http://localhost:3000/api/meal');
        const data = await response.json();
        setMeals(data);
    };
    useEffect(() => {
        fetchMeals();
    }, []);
    console.log(meals);
    
    const handleDrinkCategoryChange = (category) => {
        setSelectedDrinkCategory(category);
    };

    const handlePrevDrink = () => {
        setSlideDirection('left');
        const drinks = meals.filter(meal => meal.category === selectedDrinkCategory);
        if (drinks.length === 0) return;
        
        setCurrentDrinkIndex(prevIndex => 
            prevIndex === 0 ? drinks.length - 1 : prevIndex - 1
        );
    };

    const handleNextDrink = () => {
        setSlideDirection('right');
        const drinks = meals.filter(meal => meal.category === selectedDrinkCategory);
        if (drinks.length === 0) return;
        
        setCurrentDrinkIndex(prevIndex => 
            prevIndex === drinks.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {
        setCurrentDrinkIndex(0);
    }, [selectedDrinkCategory]);

    return (
        <section className={styles.menu}>
            <div className={styles.menuContainer}>
                <p className={styles.title}>Menu</p>
                <div className={styles.selections}>
                    <div 
                        className={`${styles.selectionItem} ${selectedCategory === 'appetizers' ? styles.selected : ''}`} 
                        onClick={() => setSelectedCategory('appetizers')}
                    >
                        Appetizers
                    </div>
                    <div 
                        className={`${styles.selectionItem} ${selectedCategory === 'maki' ? styles.selected : ''}`} 
                        onClick={() => setSelectedCategory('maki')}
                    >
                        Maki
                    </div>
                    <div 
                        className={`${styles.selectionItem} ${selectedCategory === 'salads' ? styles.selected : ''}`} 
                        onClick={() => setSelectedCategory('salads')}
                    >
                        Salads
                    </div>
                    <div 
                        className={`${styles.selectionItem} ${selectedCategory === 'sashimi' ? styles.selected : ''}`} 
                        onClick={() => setSelectedCategory('sashimi')}
                    >
                        Sashimi
                    </div>
                    <div 
                        className={`${styles.selectionItem} ${selectedCategory === 'sushi' ? styles.selected : ''}`} 
                        onClick={() => setSelectedCategory('sushi')}
                    >
                        Sushi
                    </div>
                    <div 
                        className={`${styles.selectionItem} ${selectedCategory === 'ramen' ? styles.selected : ''}`} 
                        onClick={() => setSelectedCategory('ramen')}
                    >
                        Ramen
                    </div>
                    <div 
                        className={`${styles.selectionItem} ${selectedCategory === 'rice' ? styles.selected : ''}`} 
                        onClick={() => setSelectedCategory('rice')}
                    >
                        Rice
                    </div>
                </div>

                <div className={styles.meals}>
                    {meals.filter(meal => meal.category === selectedCategory && meal.highlight === true).map((meal) => (
                        <div key={meal._id} className={styles.meal}>
                            <div className={styles.image} style={{backgroundImage: `url(${meal.img})`}}></div>
                            <div className={styles.content}>
                                <p className={styles.name}>{meal.name}</p>
                                <p className={styles.price}>{meal.price.toLocaleString('vi-VN')} đ</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.drinks}>
                    <div className={styles.drink}>
                        <div className={styles.drinkContainer}>
                            {meals
                                .filter(meal => meal.category === selectedDrinkCategory)
                                .map((drink, index) => (
                                    index === currentDrinkIndex && (
                                        <div 
                                            key={drink._id}
                                            className={slideDirection === 'right' ? styles.drinkSlide : styles.drinkSlideReverse}
                                            style={{ '--slide-direction': slideDirection === 'right' ? '20px' : '-20px' }}
                                        >
                                            <div 
                                                className={styles.image} 
                                                style={{
                                                    backgroundImage: `url(${drink.img})`,
                                                    transition: 'all 0.3s ease'
                                                }}
                                            ></div>
                                            <div className={styles.content}>
                                                <div className={styles.name}>{drink.name}</div>
                                                <div className={styles.price}>
                                                    {drink.price.toLocaleString('vi-VN')} đ
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}
                        </div>
                    </div>
                    <div className={styles.buttons2}>
                        <button onClick={handlePrevDrink}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <button onClick={handleNextDrink}>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>  
                    </div>  
                    <div className={styles.options}>
                        <div 
                            className={`${styles.option} ${selectedDrinkCategory === 'softdrinks' ? styles.chosen : ''}`}
                            onClick={() => handleDrinkCategoryChange('softdrinks')}
                        >
                            Soft Drinks
                        </div>
                        <div 
                            className={`${styles.option} ${selectedDrinkCategory === 'alcohol' ? styles.chosen : ''}`}
                            onClick={() => handleDrinkCategoryChange('alcohol')}
                        >
                            Alcohol
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Menu;

