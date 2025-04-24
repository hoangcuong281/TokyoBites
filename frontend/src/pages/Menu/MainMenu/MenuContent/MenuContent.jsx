import { useEffect, useState } from 'react';
import styles from './MenuContent.module.css';


function MenuContent({ selectedCategory }){
    const [meals, setMeals] = useState([]);

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

    console.log(meals);
    return(
        <div className={styles.menuRight}>
            <div className={styles.menuItems}>
                {meals.filter(meal => meal.category === selectedCategory).map((meal) => (
                    <div className={styles.card} style={{backgroundImage: `url(${meal.img})`}}>
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

export default MenuContent;