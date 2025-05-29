import styles from './detailmenu.module.css';

function DetailMenu() {
    return (
        <section className={styles.detailMenu}>
            <div className={styles.container}>
                <div className={styles.header}>
                    Thực đơn
                </div>
                <div className={styles.content}>
                    <div className={styles.tag1}>
                        <div className={styles.tagTitle}>
                            Món ăn
                        </div>
                        <div className={styles.tagDescription}>
                            Tất cả món ăn đều được chế biến tươi mới ngay tại nhà hàng mỗi ngày
                        </div>
                        <a href='/menu' className={styles.tagBtn}>Xem thực đơn</a>
                    </div>
                    <div className={styles.tag2}>
                        <div className={styles.tagTitle}>
                            Thành phần
                        </div>
                        <div className={styles.tagDescription}>
                            Thành phần và nguyên liệu tươi sạch, tuyển chọn kỹ lưỡng
                        </div>
                        <a className={styles.tagBtn}>Xem thành phần</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DetailMenu;