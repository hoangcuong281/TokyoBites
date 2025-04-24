import { useState } from 'react';
import Menu from './Menu/menu'
import Table from './Table/table'
import styles from './admin.module.css'

function Admin(){
    const [activeView, setActiveView] = useState('menu');

    return(
        <div className={styles.adminContainer}>
            <div className={styles.container}>
                <h1 className={styles.title}>Table and Menu Management</h1>
                <div className={styles.adminButtons}>
                    <button 
                        className={`${styles.tab} ${activeView === 'menu' ? styles.tabActive : ''}`}
                        onClick={() => setActiveView('menu')}
                    >
                        Menu
                    </button>
                    <button 
                        className={`${styles.tab} ${activeView === 'table' ? styles.tabActive : ''}`}
                        onClick={() => setActiveView('table')}
                    >
                        Table
                    </button>
                </div>
                <div className={styles.contentCard}>
                    <div className={styles.adminContent}>
                        {activeView === 'menu' && <Menu/>}
                        {activeView === 'table' && <Table/>}
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}   

export default Admin;
