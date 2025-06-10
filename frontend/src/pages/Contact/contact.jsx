import styles from './contact.module.css';
import Navbar from '../../components/NavBar/navBar';
import Footer from '../../components/Footer/Footer';

function Contact() {
  return (
    <div className={styles.contact}>
      <Navbar />
      <div className={styles.contactContainer}>
        <h1 className={styles.contactTitle}>Liên hệ với Tokyo Bites</h1>
        <div className={styles.infoGroup}>
          <div className={styles.infoItem}>
            <strong>Địa chỉ:</strong> 2025 Đường Nhật Bản, Phường Thăng Long, Quận Hoàng Mai, Hà Nội
          </div>
          <div className={styles.infoItem}>
            <strong>Điện thoại:</strong> <a href="tel:0123456789">0123 456 789</a>
          </div>
          <div className={styles.infoItem}>
            <strong>Email:</strong> <a href="mailto:tokyobites@gmail.com">tokyobites@gmail.com</a>
          </div>
          <div className={styles.infoItem}>
            <strong>Facebook:</strong> <a href="https://facebook.com/tokyobites" target="_blank" rel="noopener noreferrer">facebook.com/tokyobites</a>
          </div>
          <div className={styles.infoItem}>
            <strong>Instagram:</strong> <a href="https://instagram.com/tokyobites" target="_blank" rel="noopener noreferrer">@tokyobites</a>
          </div>
        </div>
        <div className={styles.mapContainer}>
          <iframe
            title="Tokyo Bites Map"
            src="https://www.google.com/maps?q=Trường+Đại+học+Thăng+Long,+Nghiêm+Xuân+Yêm,+Hoàng+Mai,+Hà+Nội&output=embed"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: 8 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact