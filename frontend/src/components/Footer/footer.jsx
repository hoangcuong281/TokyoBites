import React, { useState } from 'react';
import styles from './footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'

function Footer(){
    const [successMsg, setSuccessMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const response = await fetch('http://localhost:3000/api/email/add_email/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        if (response.ok){
            setSuccessMsg("Bạn đã đăng ký nhận thông báo các chương trình ưu đãi!!!");
            e.target.reset();
        }
    };
    
    return(
        <footer className={styles.footer}>
            <div className={styles.footerLeft}>
                <div className={styles.footerContent}>Menu</div>
                <div className={styles.footerContent}>Đầu bếp</div>
                <div className={styles.footerContent}>Sự kiện</div>
                <div className={styles.footerContent}>Liên hệ</div>
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
                <p className={`${styles.signUp} ${styles.footerContent}`}>Đăng ký nhận thông tin ưu đãi: </p>
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
                        Đăng ký
                    </button>
                </form>
                {successMsg && (
                    <div className={styles.successMsg}>{successMsg}</div>
                )}
            </div>
        </footer>
    );
}

export default Footer;