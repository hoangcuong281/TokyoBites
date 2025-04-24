import styles from './ourteam.module.css'
import Narisawa from '../../../assets/Narisawa.jpg'
import HiroyasuKawate from '../../../assets/HiroyasuKawate.jpg'
import ShinsukeIshii from '../../../assets/ShinsukeIshii.jpg'

function OurTeam(){
    return(
        <section className={styles.ourTeam}>
            <div className={styles.title}>Our Team</div>
            <div className={styles.memContain}>
                <div className={styles.memItem}>
                    <img className={styles.memImg} src={Narisawa}></img>
                    <div className={styles.memName}>Yoshihiro Narisawa</div>
                    <div className={styles.memPosition}>Chef</div>
                    <div className={styles.memQuote}>“Most of the vegetables and fruit in Japan contain pesticides. It's the role of the chef to support (organic) producers.”</div>
                </div>
                <div className={styles.memItem}pg>
                    <img className={styles.memImg} src={HiroyasuKawate}></img>
                    <div className={styles.memName}>Hiroyasu Kawate</div>
                    <div className={styles.memPosition}>Chef</div>
                    <div className={styles.memQuote}>“It is important to focus on balanced and plant-based meals, centred around vegetables, to leave something for future generations.”</div>
                </div>
                <div className={styles.memItem}g>
                    <img className={styles.memImg} src={ShinsukeIshii}></img>
                    <div className={styles.memName}>Shinsuke Ishii</div>
                    <div className={styles.memPosition}>Chef</div>
                    <div className={styles.memQuote}>“I asked myself what I could do as a chef, and I decided to inform as many people as possible through my work.”</div>
                </div>
            </div>
        </section>
    )
}

export default OurTeam;
