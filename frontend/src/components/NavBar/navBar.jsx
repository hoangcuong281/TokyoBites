import styles from './navBar.module.css'

function Header(){

    return(
        <header id={styles.headerSpace}>
            <section className={styles.navBar}>
                <nav className={styles.navbar}>
                    <div className={styles.navLeft}>
                        <div className={styles.menuIcon}>
                            <i className="fa fa-solid fa-bars"></i>
                        </div>
                        <a href="/menu" className={styles.navLink}>Menu</a>
                        <a href="#" className={styles.navLink}>Team</a>
                    </div>
            
                    <div className={styles.navCenter}>
                        <a href="/home" className={styles.logo}>TOKYO BITES</a>
                    </div>
            
                    <div className={styles.navRight}>
                        <a href="/tablebooking" className={styles.btnBook}>Book A Table</a>
                        <a href="#" className={styles.navLink}>Events</a>
                        <a href="#" className={styles.navLink}>Contact</a>
                    </div>
                </nav>
            </section>
        </header>
    );
}

export default Header;