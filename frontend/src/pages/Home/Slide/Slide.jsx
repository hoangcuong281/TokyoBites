import styles from './Slide.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Hero1 from '../../../assets/Hero1.jpg';
import Hero2 from '../../../assets/Hero2.jpg';
import Hero3 from '../../../assets/Hero3.jpg';
import Hero4 from '../../../assets/Hero4.jpg';
import Hero5 from '../../../assets/Hero5.jpg';
import Hero6 from '../../../assets/Hero6.jpg';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

function Slide(){
    const handleNext = () => {
        const lists = document.querySelectorAll(`.${styles.item}`);
        document.getElementById(styles.slide).appendChild(lists[0]);
    }

    const handlePrev = () => {
        const lists = document.querySelectorAll(`.${styles.item}`);
        document.getElementById(styles.slide).prepend(lists[lists.length - 1]); 
    }
    return (
        <>
            <section className={styles.slide}>
                <div className={styles.container}>
                    <div id={styles.slide}>
                        <div className={styles.item} style={{backgroundImage: `url(${Hero1})`}}>
                        </div>

                        <div className={styles.item} style={{backgroundImage: `url(${Hero2})`}}>
                        </div>

                        <div className={styles.item} style={{backgroundImage: `url(${Hero3})`}}>
                        </div>

                        <div className={styles.item} style={{backgroundImage: `url(${Hero4})`}}>
                        </div>

                        <div className={styles.item} style={{backgroundImage: `url(${Hero5})`}}>
                        </div>

                        <div className={styles.item} style={{backgroundImage: `url(${Hero6})`}}>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button id={styles.prev} onClick={handlePrev}><FontAwesomeIcon icon={faArrowLeft} /></button>
                        <button id={styles.next} onClick={handleNext}><FontAwesomeIcon icon={faArrowRight} /></button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Slide;