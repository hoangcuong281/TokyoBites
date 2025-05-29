import { useState } from 'react';
import Menu from './Menu/menu'
import Table from './Table/table'
import Statistic from './Statistic/statistic';
import CusService from './CustomerService/cusService';
import EventManagement from './Event/event';
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
                        THỰC ĐƠN
                    </button>
                    <button 
                        className={`${styles.tab} ${activeView === 'table' ? styles.tabActive : ''}`}
                        onClick={() => setActiveView('table')}
                    >
                        ĐẶT BÀN
                    </button>
                    <button 
                        className={`${styles.tab} ${activeView === 'statistic' ? styles.tabActive : ''}`}
                        onClick={() => setActiveView('statistic')}
                    >
                        THỐNG KÊ
                    </button>
                    <button 
                        className={`${styles.tab} ${activeView === 'customerService' ? styles.tabActive : ''}`}
                        onClick={() => setActiveView('customerService')}
                    >
                        DỊCH VỤ KHÁCH HÀNG
                    </button>
                    <button 
                        className={`${styles.tab} ${activeView === 'eventManagement' ? styles.tabActive : ''}`}
                        onClick={() => setActiveView('eventManagement')}
                    >
                        SỰ KIỆN
                    </button>
                </div>
                <div className={styles.contentCard}>
                    <div className={styles.adminContent}>
                        {activeView === 'menu' && <Menu/>}
                        {activeView === 'table' && <Table/>}
                        {activeView === 'statistic' && <Statistic/>}
                        {activeView === 'customerService' && <CusService/>}
                        {activeView === 'eventManagement' && <EventManagement/>}
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}   

export default Admin;
