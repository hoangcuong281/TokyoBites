import React, { useState } from 'react';
import styles from './footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'

function Footer(){
    const [successMesg, setSuccessMesg] = useState('');

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
            setSuccessMesg("Đăng ký nhận thông báo các chương trình ưu đãi thành công!!!");
            e.target.reset();
        }
    };
    
    return(
        <footer className={styles.footer}>
            <div className={styles.footerLeft}>
                <div className={styles.leftNavLink}>
                    <div className={styles.aboutus}>VỀ CHÚNG TÔI</div>
                    <a href='/team' className={styles.footerLeftContent}>ĐỘI NGŨ</a>
                    <a href='/event' className={styles.footerLeftContent}>SỰ KIỆN</a>
                    <a href='/contact' className={styles.footerLeftContent}>LIÊN HỆ</a>
                </div>
                <a href='/rating' className={styles.rating}>ĐÁNH GIÁ TRẢI NGHIỆM CỦA BẠN TẠI TOKYO BITES</a>
            </div>
            <div className={styles.footerCenter}>
                <a href="/home" className={`${styles.footerLogo} ${styles.logo}`}>TOKYO BITES</a>
                <div className={styles.footerIcon}>
                    <FontAwesomeIcon icon={faFacebook} />
                    <FontAwesomeIcon icon={faInstagram} />
                    <FontAwesomeIcon icon={faTwitter} />
                    <FontAwesomeIcon icon={faYoutube} />
                </div>
                <div className={styles.leftPolicy}>
                    <a href='/privacy' className={styles.footerLeftContent}>Chính sách bảo mật</a>
                    <a href='/terms-conditions' className={styles.footerLeftContent}>Điều khoản sử dụng</a>
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
                        className={styles.registerButton}
                    >
                        Đăng ký
                    </button>
                </form>
                {successMesg && (
                    <div className={styles.successMesg}>{successMesg}</div>
                )}
            </div>
        </footer>
    );
}

export default Footer;