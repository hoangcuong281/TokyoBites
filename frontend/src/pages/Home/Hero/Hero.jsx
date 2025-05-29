import styles from './Hero.module.css'

function HeroItem() {
    return (
        <section className={styles.hero}>
            <video
                autoPlay
                muted
                loop
                className={styles.bgVideo}
            >
                <source src="https://res.cloudinary.com/dqxeupx0u/video/upload/v1748347324/iq4qvlexewp7s3rtdx0j.webm" type="video/webm" />
            </video>
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <div>
                    HƯƠNG VỊ <span style={{ color: 'var(--Aka)' }}>TOKYO</span><br />
                    CHẠM ĐẾN TÂM HỒN BẠN
                </div>
                <div>
                    Tokyo Bites không chỉ đơn thuần là một nhà hàng, mà là hành trình khám phá văn hóa ẩm thực đường phố Tokyo — nơi tinh hoa truyền thống hòa quyện cùng hơi thở hiện đại. 
                    Lấy cảm hứng từ những quán ăn tấp nập giữa lòng thủ đô Nhật Bản, chúng tôi mang đến trải nghiệm ẩm thực chân thực với đủ hương vị đặc trưng của xứ sở hoa anh đào.
                </div>
            </div>
        </section>
    );
}

export default HeroItem;