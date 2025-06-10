import React, { useState } from 'react';

import NavBar from '../../components/NavBar/navBar'
import Footer from '../../components/Footer/Footer' 
import styles from './rating.module.css';

function Home() {
    const [validationErrors, setValidationErrors] = useState({});
    const [rating, setRating] = useState({
        email: '',
        star: 0,
        feedback: ''
    });
    const [popup, setPopup] = useState({ show: false, message: '', type: '' });

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRating(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'email') {
            if (!value.trim()) {
                setValidationErrors(prev => ({
                    ...prev,
                    email: 'Vui lòng nhập email.'
                }));
            } else if (!isValidEmail(value)) {
                setValidationErrors(prev => ({
                    ...prev,
                    email: 'Vui lòng nhập địa chỉ email hợp lệ.'
                }));
            } else {
                setValidationErrors(prev => ({
                    ...prev,
                    email: ''
                }));
            }
        }

        // Xử lý khi chọn sao bằng input (nếu dùng input type="number" hoặc select)
        if (name === 'star') {
            if (value >= 1 && value <= 5) {
                setValidationErrors(prev => ({
                    ...prev,
                    star: ''
                }));
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let hasError = false;

        // Kiểm tra email
        if (!rating.email.trim()) {
            setValidationErrors(prev => ({
                ...prev,
                email: 'Vui lòng nhập email.'
            }));
            hasError = true;
        } else if (!isValidEmail(rating.email)) {
            setValidationErrors(prev => ({
                ...prev,
                email: 'Vui lòng nhập địa chỉ email hợp lệ.'
            }));
            hasError = true;
        } else {
            setValidationErrors(prev => ({
                ...prev,
                email: ''
            }));
        }

        // Kiểm tra số sao
        if (!rating.star || rating.star < 1 || rating.star > 5) {
            setValidationErrors(prev => ({
                ...prev,
                star: 'Vui lòng chọn số sao đánh giá.'
            }));
            hasError = true;
        } else {
            setValidationErrors(prev => ({
                ...prev,
                star: ''
            }));
        }

        if (hasError) return;

        fetch('http://localhost:3000/api/rating/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rating)
        })
        .then(res => {
            if (res.ok) {
                setPopup({ show: true, message: 'Cảm ơn bạn đã gửi đánh giá!', type: 'success' });
                setRating({
                    email: '',
                    star: 0,
                    feedback: ''
                });
                setValidationErrors({});
            } else {
                setPopup({ show: true, message: 'Đã xảy ra lỗi khi gửi đánh giá. Vui lòng thử lại sau.', type: 'error' });
            }
        })
        .catch(err => {
            console.error('Error:', err);
            setPopup({ show: true, message: 'Đã xảy ra lỗi khi gửi đánh giá. Vui lòng thử lại sau.', type: 'error' });
        });
    };

    const closePopup = () => setPopup({ show: false, message: '', type: '' });

    return(
        <>
            <NavBar/>
            <div className={styles.ratingContainer}>
                <div className={styles.ratingContentContainer}>
                    <h1 className={styles.ratingHeader}>Chia sẻ trải nghiệm của bạn ở Tokyo Bites:</h1>
                    <p className={styles.ratingDescription}>
                        Những đánh giá của bạn giúp chúng tôi cải thiện dịch vụ và mang đến trải nghiệm tốt hơn cho khách hàng.
                    </p>
                    <form className={styles.ratingForm} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label>Email</label>
                            <input 
                                type="text" 
                                name="email" 
                                value={rating.email}
                                onChange={handleInputChange}
                                className={`${styles.input} ${validationErrors.email ? styles.inputError : ''}`}
                            />
                            {validationErrors.email && (
                                <span className={styles.errorMessage}>
                                    {validationErrors.email}
                                </span>
                            )}
                        </div>
                        <div className={styles.stars}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={styles.star}
                                    onClick={() => {
                                        setRating(prev => ({ ...prev, star }));
                                        if (validationErrors.star) {
                                            setValidationErrors(prev => ({ ...prev, star: '' }));
                                        }
                                    }}
                                    style={{ cursor: 'pointer', fontSize: 28, display: 'inline-block' }}
                                    aria-label={`Chọn ${star} sao`}
                                >
                                    <svg
                                        width="30"
                                        height="30"
                                        viewBox="0 0 24 24"
                                        fill={rating.star >= star ? "#FFD700" : "#fff"}
                                        stroke="#222"
                                        strokeWidth="1.3"
                                        strokeLinejoin="round"
                                        style={{ display: 'block' }}
                                    >
                                        <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
                                    </svg>
                                </span>
                            ))}
                            {validationErrors.star && (
                                <span className={styles.errorMessage}>{validationErrors.star}</span>
                            )}
                        </div>
                        <div className={styles.formGroup}>
                            <label>Phản hồi</label>
                            <textarea
                                name="feedback"
                                value={rating.feedback}
                                onChange={handleInputChange}
                                className={styles.input}
                                id={styles.feedbackInput}
                            />
                        </div>
                        <button type="submit" className={styles.submitButton}>Gửi</button>
                    </form>
                </div>
            </div>
            {popup.show && (
                <div className={`${styles.popup} ${popup.type === 'success' ? styles.popupSuccess : styles.popupError}`}>
                    <div className={styles.popupContent}>
                        <span>{popup.message}</span>
                        <button className={styles.popupClose} onClick={closePopup}>Đóng</button>
                    </div>
                </div>
            )}
            <Footer/>
        </>
    );
}

export default Home;