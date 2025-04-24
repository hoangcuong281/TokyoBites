import styles from './Menu.module.css';
import DragonRoll from '../../../assets/DragonRoll.jpg';
import NamaSpecialRoll from '../../../assets/NamaSpecialRoll.png';
import SpicyFriedShrimpRoll from '../../../assets/SpicyFriedShrimpRoll.png';
import MeltedCheeseRoll from '../../../assets/MeltedCheeseRoll.jpg';
import BiaHaNoi from '../../../assets/BiaHaNoi.png';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

function Menu(){
    return (
        <section className={styles.menu}>
            <div className={styles.menuContainer}>
                <p className={styles.title}>Menu</p>
                <div className={styles.selections}>
                    <div className={styles.selectionItem}>Appetizers</div>
                    <div className={styles.selectionItem}>Maki</div>
                    <div className={styles.selectionItem}>Salads</div>
                    <div className={styles.selectionItem}>Sashimi</div>
                    <div className={styles.selectionItem}>Sushi</div>
                    <div className={styles.selectionItem}>Ramen</div>
                    <div className={styles.selectionItem}>Rice</div>
                </div>
                <div className={styles.meals}>
                    <div className={styles.meal}>
                        <div className={styles.image} style={{backgroundImage: `url(${DragonRoll})`}}></div>
                        <div className={styles.content}>
                            <p className={styles.name}>Dragon Roll</p>
                            <p className={styles.price}>188.000 đ</p>
                        </div>
                    </div>
                    <div className={styles.meal}>
                        <div className={styles.image} style={{backgroundImage: `url(${NamaSpecialRoll})`}}></div>
                        <div className={styles.content}>
                            <p className={styles.name}>Nama's Special Roll</p>    
                            <p className={styles.price}>288.000 đ</p>
                        </div>
                    </div>
                    <div className={styles.meal}>
                        <div className={styles.image} style={{backgroundImage: `url(${SpicyFriedShrimpRoll})`}}></div>
                        <div className={styles.content}>
                            <p className={styles.name}>Spicy Fried Shrimp Roll</p>
                            <p className={styles.price}>88.000 đ</p>
                        </div>
                    </div>
                    <div className={styles.meal}>
                        <div className={styles.image} style={{backgroundImage: `url(${MeltedCheeseRoll})`}}></div>
                        <div className={styles.content}>
                            <p className={styles.name}>Melted Cheese Roll</p>
                            <p className={styles.price}>118.000 đ</p>
                        </div>
                    </div>
                </div>
                <div className={styles.drinks}>
                    <div className={styles.drink}>
                        <div className={styles.image} style={{backgroundImage: `url(${BiaHaNoi})`}}></div>
                        <div className={styles.content}>
                            <div className={styles.name}>Bia Ha Noi</div>
                            <div className={styles.price}>12.000 đ</div>
                        </div>
                    </div>
                    <div className={styles.buttons2}>
                        <button id="prev"><FontAwesomeIcon icon={faArrowLeft} /></button>
                        <button id="next"><FontAwesomeIcon icon={faArrowRight} /></button>  
                    </div>  
                    <div className={styles.options}>
                        <div className={styles.option}>
                            Soft Drinks
                        </div>
                        <div className={styles.option}>
                            Alcohol
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Menu;
