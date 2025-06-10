import { useState, useEffect } from 'react';
import styles from './review.module.css';

function Review() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStar, setFilterStar] = useState(0); // Bộ lọc theo số sao
  const [showPopup, setShowPopup] = useState(false); // Hiển thị popup
  const [selectedReview, setSelectedReview] = useState(null); // Đánh giá được chọn để xóa

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/rating');
      const data = await response.json();
      setReviews(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/rating/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setReviews(reviews.filter(review => review._id !== id));
        setShowPopup(false); // Đóng popup sau khi xóa thành công
      } else {
        console.error('Error deleting review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const calculateAverageStars = () => {
    if (reviews.length === 0) return 0;
    const totalStars = reviews.reduce((sum, review) => sum + review.star, 0);
    return (totalStars / reviews.length).toFixed(1); // Tính trung bình và làm tròn 1 chữ số
  };

  const filteredReviews = filterStar > 0
    ? reviews.filter(review => review.star === filterStar)
    : reviews;

  const renderAverageStars = () => {
    const averageStars = Math.round(calculateAverageStars());
    return (
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map(star => (
          <svg
            key={star}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={averageStars >= star ? "#FFD700" : "#fff"}
            stroke="#222"
            strokeWidth="1.3"
            strokeLinejoin="round"
            style={{ display: 'inline-block', marginRight: '4px' }}
          >
            <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.review}>
      <div className={styles.averageStars}>
        <p><strong>Đánh giá trung bình:</strong></p>
        {renderAverageStars()}
      </div>
      <div className={styles.filter}>
        <label htmlFor="filterStar">Lọc theo số sao:</label>
        <select
          id="filterStar"
          value={filterStar}
          onChange={(e) => setFilterStar(Number(e.target.value))}
          className={styles.filterSelect}
        >
          <option value={0}>Tất cả</option>
          {[1, 2, 3, 4, 5].map(star => (
            <option key={star} value={star}>{star} sao</option>
          ))}
        </select>
      </div>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div className={styles.reviewList}>
          {filteredReviews.map(review => (
            <div key={review._id} className={styles.reviewItem}>
              <p><strong>Email:</strong> {review.email}</p>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map(star => (
                  <svg
                    key={star}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={review.star >= star ? "#FFD700" : "#fff"}
                    stroke="#222"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                    style={{ display: 'inline-block', marginRight: '4px' }}
                  >
                    <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
                  </svg>
                ))}
              </div>
              <p><strong>Phản hồi:</strong> {review.feedback}</p>
              <button
                className={styles.deleteButton}
                onClick={() => {
                  setSelectedReview(review);
                  setShowPopup(true);
                }}
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      )}
      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <p>Bạn có chắc chắn muốn xóa đánh giá của <strong>{selectedReview.email}</strong>?</p>
            <div className={styles.popupButtons}>
              <button
                className={styles.confirmButton}
                onClick={() => handleDelete(selectedReview._id)}
              >
                Xác nhận
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setShowPopup(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Review;