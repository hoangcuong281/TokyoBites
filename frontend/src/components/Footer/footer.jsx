import styles from './footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'

function Footer(){
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        // Here you can add your newsletter subscription logic
        console.log('Newsletter subscription for:', email);
    };
    
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
                <form onSubmit={handleSubmit} className={styles.inputContainer}>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email"
                        required
                    />
                    <button 
                        type="submit" 
                        className={styles.footerContent}
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </footer>
    );
}

export default Footer;