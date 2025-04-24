import styles from "./Header.module.css";

function Header(){
    return(
        <div className={styles.topTitle}>
            <p className={styles.menuTitle}>Menu</p>
        </div>
    );
}

export default Header;