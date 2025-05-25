import { useState } from 'react';
import Menu from './Menu/menu'
import Table from './Table/table'
import Statistic from './Statistic/statistic';
import CusService from './CustomerService/cusService';
import styles from './admin.module.css'


function Admin(){
    const [activeView, setActiveView] = useState('menu');

    return(
        <div className={styles.adminContainer}>
            <div className={styles.container}>
                <h1 className={styles.title}>Admin Management</h1>
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
                        Đặt bàn
                    </button>
                    <button 
                        className={`${styles.tab} ${activeView === 'statistic' ? styles.tabActive : ''}`}
                        onClick={() => setActiveView('statistic')}
                    >
                        Thống kê
                    </button>
                    <button 
                        className={`${styles.tab} ${activeView === 'customerService' ? styles.tabActive : ''}`}
                        onClick={() => setActiveView('customerService')}
                    >
                        Dịch vụ khách hàng
                    </button>
                </div>
                <div className={styles.contentCard}>
                    <div className={styles.adminContent}>
                        {activeView === 'menu' && <Menu/>}
                        {activeView === 'table' && <Table/>}
                        {activeView === 'statistic' && <Statistic/>}
                        {activeView === 'customerService' && <CusService/>}
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}   

export default Admin;
