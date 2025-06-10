import styles from './Sidebar.module.css';

function Sidebar({ selectedCategory, onCategoryChange }){
    const handleCategoryClick = (category) => {
        onCategoryChange(category);
    };
    return(
        <div className={styles.sidebar}>
            <ul className={styles.mealsList}>
                <li className={`${selectedCategory === 'all' ? styles.selected : ''} ${styles.menuSelection}`} onClick={() => handleCategoryClick('all')} data-category="all" id="all">Tất cả</li>
                <li className={`${selectedCategory === 'appetizers' ? styles.selected : ''} ${styles.menuSelection}`} onClick={() => handleCategoryClick('appetizers')} data-category="appetizers" id="appetizers">Khai vị</li>
                <li className={`${selectedCategory === 'maki' ? styles.selected : ''} ${styles.menuSelection}`} onClick={() => handleCategoryClick('maki')} data-category="maki" id="maki">Maki</li>
                <li className={`${selectedCategory === 'sushi' ? styles.selected : ''} ${styles.menuSelection}`} onClick={() => handleCategoryClick('sushi')} data-category="sushi" id="sushi">Sushi</li>
                <li className={`${selectedCategory === 'sashimi' ? styles.selected : ''} ${styles.menuSelection}`} onClick={() => handleCategoryClick('sashimi')} data-category="sashimi" id="sashimi">Sashimi</li>
                <li className={`${selectedCategory === 'ramen' ? styles.selected : ''} ${styles.menuSelection}`} onClick={() => handleCategoryClick('ramen')} data-category="ramen" id="ramen">Ramen</li>
                <li className={`${selectedCategory === 'rice' ? styles.selected : ''} ${styles.menuSelection}`} onClick={() => handleCategoryClick('rice')} data-category="rice" id="rice">Cơm</li>
                <li className={`${selectedCategory === 'dessert' ? styles.selected : ''} ${styles.menuSelection}`} onClick={() => handleCategoryClick('dessert')} data-category="dessert" id="dessert">Tráng miệng</li>
                <li className={`${selectedCategory === 'drinks' ? styles.selected : ''} ${styles.menuSelection}`} onClick={() => handleCategoryClick('drinks')} data-category="drinks" id="drinks">Đồ uống</li>
            </ul>
        </div>
    );
}

export default Sidebar;