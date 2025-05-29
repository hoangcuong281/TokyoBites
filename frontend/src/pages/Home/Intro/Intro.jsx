import styles from './Intro.module.css';

function Intro() {
    return (
        <section className={styles.intro}>
            <div className={styles.firstIntro}>
                <div className={styles.introLeft}>
                    <p>
                        Một bữa ăn, cả hành trình Tokyo
                    </p>
                </div>
                <div className={styles.introRight}>
                    <img
                        src="https://res.cloudinary.com/dqxeupx0u/image/upload/v1741682689/Hero6_kh3mrq.jpg"
                        alt="Tokyo's food"
                        className={styles.introImg}
                        />
                </div>  
            </div>
            <div className={styles.secondIntro}>
                <div className={styles.introRight2}>
                    <img
                        src="https://res.cloudinary.com/dqxeupx0u/image/upload/v1741682687/Hero1_hu0ysl.jpg"
                        alt="Kitchen"
                        className={styles.introImg2}
                        />
                </div>
                <div className={styles.introLeft2}>
                    <p>
                        Gìn giữ tinh hoa, sáng tạo từng ngày
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Intro;