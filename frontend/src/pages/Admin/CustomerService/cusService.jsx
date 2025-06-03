import React, { useState } from 'react';
import styles from './cusService.module.css';

function CusService() {
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [emailData, setEmailData] = useState(null);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};
        if (!subject.trim()) newErrors.subject = 'Vui lòng nhập tiêu đề';
        if (!text.trim()) newErrors.text = 'Vui lòng nhập nội dung';
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        setEmailData({ subject, text });
        handleSendEmail();
        setSubject('');
        setText('');
    };

    const handleSendEmail = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/email/send_email/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subject, text }),
            });

            if (!response.ok) {
                throw new Error('Failed to send email');
            }

            const data = await response.json();
            console.log('Email sent successfully:', data);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }

    return (
        <div className={styles.container}>
            <h1>Gửi chương trình ưu đãi đến toàn bộ khách hàng</h1>
            <form onSubmit={handleSubmit} className={styles.mailForm}>
                <div>
                    <label>Tiêu đề:</label>
                    <textarea
                        placeholder="Nhập tiêu đề email"
                        value={subject}
                        onChange={e => {
                            setSubject(e.target.value);
                            if (errors.subject && e.target.value.trim()) {
                                setErrors(prev => ({ ...prev, subject: undefined }));
                            }
                        }}
                    />
                    {errors.subject && (
                        <span className={styles.errorMsg}>{errors.subject}</span>
                    )}
                </div>
                <div>
                    <label>Nội dung:</label>
                    <textarea
                        placeholder="Nhập nội dung email"
                        value={text}
                        onChange={e => {
                            setText(e.target.value);
                            if (errors.text && e.target.value.trim()) {
                                setErrors(prev => ({ ...prev, text: undefined }));
                            }
                        }}
                        id={styles.contentArea}
                    />
                    {errors.text && (
                        <span className={styles.errorMsg}>{errors.text}</span>
                    )}
                </div>
                <button type="submit">Lưu</button>
            </form>
            {emailData && (
                <div className={styles.successMsg}>
                    Gửi email thành công!
                </div>
            )}
        </div>
    );
}

export default CusService;