import styles from './team.module.css';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

function Team() {

    return (
        <div className={styles.teamContainer}>
            <NavBar />
            <div className={styles.topTitle}>
                <p className={styles.teamTitle}>ĐỘI NGŨ CỦA TOKYO BITES</p>
            </div>
            <section className={styles.ourTeam}>
                <div className={styles.memContain}>
                    <div className={styles.memItem}>
                        <img className={styles.memImg} src='https://res.cloudinary.com/dqxeupx0u/image/upload/v1741682686/Narisawa_mzejuv.jpg'></img>
                        <div className={styles.memName}>Yoshihiro Narisawa</div>
                        <div className={styles.memPosition}>Chef</div>
                        <div className={styles.memQuote}>“Most of the vegetables and fruit in Japan contain pesticides. It's the role of the chef to support (organic) producers.”</div>
                    </div>
                    <div className={styles.memItem}pg>
                        <img className={styles.memImg} src='https://res.cloudinary.com/dqxeupx0u/image/upload/v1741682689/Hiroyasu_Kawate_jea7hm.jpg'></img>
                        <div className={styles.memName}>Hiroyasu Kawate</div>
                        <div className={styles.memPosition}>Chef</div>
                        <div className={styles.memQuote}>“It is important to focus on balanced and plant-based meals, centred around vegetables, to leave something for future generations.”</div>
                    </div>
                    <div className={styles.memItem}g>
                        <img className={styles.memImg} src='https://res.cloudinary.com/dqxeupx0u/image/upload/v1741682688/Shinsuke_Ishii_p6gshr.jpg'></img>
                        <div className={styles.memName}>Shinsuke Ishii</div>
                        <div className={styles.memPosition}>Chef</div>
                        <div className={styles.memQuote}>“I asked myself what I could do as a chef, and I decided to inform as many people as possible through my work.”</div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
export default Team;