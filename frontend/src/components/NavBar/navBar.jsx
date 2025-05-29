import styles from './navBar.module.css'

function Header(){

    return(
        <header id={styles.headerSpace}>
            <section className={styles.navBar}>
                <nav className={styles.navbar}>
                    <div className={styles.navLeft}>
                        <a href="/menu" className={styles.navLink}>THỰC ĐƠN</a>
                        <a href="/team" className={styles.navLink}>ĐỘI NGŨ</a>
                    </div>
            
                    <div className={styles.navCenter}>
                        <a href="/home" className={styles.logo}>TOKYO BITES</a>
                    </div>
            
                    <div className={styles.navRight}>
                        <a href="/tablebooking" className={styles.btnBook}>ĐẶT BÀN</a>
                        <a href="/event" className={styles.navLink}>SỰ KIỆN</a>
                        <a href="/contact" className={styles.navLink}>LIÊN HỆ</a>
                    </div>
                </nav>
            </section>
        </header>
    );
}

export default Header;