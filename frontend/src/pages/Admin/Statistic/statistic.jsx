import styles from './statistic.module.css';
import React, { useEffect, useState } from 'react';

function Statistic() {
    const [bookingStats, setBookingStats] = useState({
        daily: { normal: 0, premium: 0, vip: 0 },
        monthly: { normal: 0, premium: 0, vip: 0 }
    });
    const [guestStats, setGuestStats] = useState({
        daily: 0,
        monthly: 0
    });
    const [revenueStats, setRevenueStats] = useState({
        daily: 0,
        monthly: 0
    });
    const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0, 10));

    const fetchBookingStats = async (date) => {
        try {
            const response = await fetch("http://localhost:3000/api/table");
            const bookings = await response.json();

            const selected = new Date(date);
            const selectedDay = selected.toISOString().slice(0, 10);
            const selectedMonth = selected.toISOString().slice(0, 7);

            const daily = { normal: 0, premium: 0, vip: 0 };
            const monthly = { normal: 0, premium: 0, vip: 0 };

            let dailyGuests = 0;
            let monthlyGuests = 0;
            let dailyRevenue = 0;
            let monthlyRevenue = 0;

            const typeMap = {
                NORMALTABLE: 'normal',
                PRENIUMTABLE: 'premium',
                VIPTABLE: 'vip'
            };

            bookings.forEach(b => {
                // Chỉ tính những bàn đã thanh toán (bill là số)
                const isPaid = typeof b.bill === 'number' && !isNaN(b.bill);
                if (!isPaid) return;

                const type = typeMap[b.tableType];
                if (!type) return;

                // Thống kê theo ngày
                if (b.date.startsWith(selectedDay)) {
                    daily[type] += 1;
                    dailyGuests += Number(b.quantity) || 0;
                    dailyRevenue += Number(b.bill) || 0;
                }
                // Thống kê theo tháng
                if (b.date.startsWith(selectedMonth)) {
                    monthly[type] += 1;
                    monthlyGuests += Number(b.quantity) || 0;
                    monthlyRevenue += Number(b.bill) || 0;
                }
            });

            setBookingStats({ daily, monthly });
            setGuestStats({ daily: dailyGuests, monthly: monthlyGuests });
            setRevenueStats({ daily: dailyRevenue, monthly: monthlyRevenue });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBookingStats(selectedDate);
    }, [selectedDate]);

    function formatDate(input) {
        const parts = input.split("-");
        if (parts.length === 3) {
            const [year, month, day] = parts;
            return `${day}/${month}/${year}`;
        } else if (parts.length === 2) {
            const [year, month] = parts;
            return `${month}/${year}`;
        } else {
            return "Định dạng không hợp lệ";
        }
    }

    function formatCurrency(number) {
        return Number(number).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }

    return (
    <div className={styles.bookingStats}>
        <h2 className={styles.heading}>Thông số đặt bàn: </h2>
        <label className={styles.label}>
            Chọn thời gian:  <br/>
            <input
                className={styles.dateInput}
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
            />
        </label>
        <div className={styles.section}>
            <h3 className={styles.subheading}>Số bàn đã thanh toán trong ngày: {formatDate(selectedDate) || 'Chọn ngày để bắt đầu'}</h3>
            <p className={styles.stat}>Bàn thường: <strong>{bookingStats.daily.normal}</strong></p>
            <p className={styles.stat}>Bàn cao cấp: <strong>{bookingStats.daily.premium}</strong></p>
            <p className={styles.stat}>Bàn VIP: <strong>{bookingStats.daily.vip}</strong></p>
            <p className={styles.stat}>Tổng lượt khách: <strong>{guestStats.daily}</strong></p>
            <p className={styles.stat}>Tổng doanh thu: <strong>{formatCurrency(revenueStats.daily)}</strong></p>
        </div>
        <div className={styles.section}>
            <h3 className={styles.subheading}>Số bàn đã thanh toán trong tháng: {formatDate(selectedDate.slice(0, 7))}</h3>
            <p className={styles.stat}>Bàn thường: <strong>{bookingStats.monthly.normal}</strong></p>
            <p className={styles.stat}>Bàn cao cấp: <strong>{bookingStats.monthly.premium}</strong></p>
            <p className={styles.stat}>Bàn VIP: <strong>{bookingStats.monthly.vip}</strong></p>
            <p className={styles.stat}>Tổng lượt khách: <strong>{guestStats.monthly}</strong></p>
            <p className={styles.stat}>Tổng doanh thu: <strong>{formatCurrency(revenueStats.monthly)}</strong></p>
        </div>
    </div>
    );
}

export default Statistic;