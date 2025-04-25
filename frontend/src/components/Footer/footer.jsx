import styles from './footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'

function Footer(){
    
    return(
        <footer className={styles.footer}>
            <div className={styles.footerLeft}>
                <div className={styles.footerContent}>Menu</div>
                <div className={styles.footerContent}>Team</div>
                <div className={styles.footerContent}>Events</div>
                <div className={styles.footerContent}>Contact</div>
            </div>
            <div className={styles.footerCenter}>
                <a href="/home" className={`${styles.footerLogo} ${styles.logo}`}>TOKYO BITES</a>
                <div className={styles.footerIcon}>
                    <FontAwesomeIcon icon={faFacebook} /> 
                    <FontAwesomeIcon icon={faInstagram} />
                    <FontAwesomeIcon icon={faTwitter} />
                    <FontAwesomeIcon icon={faYoutube} />
                </div>
            </div>
            <div className={styles.footerRight}>
                <p className={`${styles.signUp} ${styles.footerContent}`}>Sign up to our newsletter</p>
                <div className={styles.inputContainer}>
                    <input type="email" placeholder="Email"/>
                </div>
            </div>
        </footer>
    );
}

export default Footer;