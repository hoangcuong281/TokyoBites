import styles from './tablebooking.module.css'
import Footer from '../../components/Footer/Footer'
import { useState, useEffect } from 'react';

function TableBooking(){
    const [validationErrors, setValidationErrors] = useState({});
    const [tablesType, setTablesType] = useState([]);
    const [availableTables, setAvailableTables] = useState({});
    
    useEffect(() => {
        const fetchTablesType = async () => {
            const response = await fetch('http://localhost:3000/api/table/config');
            const data = await response.json();
            setTablesType(data);
        }
        fetchTablesType();
    }, []);


    const [tables, setTables] = useState({
        quantity: '',
        time: '',
        date: '',
        name: '',
        phone: '',
        email: '',
        occasion: '',
        specialRequest: '',
        tableType: '',
        tablePrice: '',
        depositStatus: '',
        bill: 0,
        tableID: '',
    });

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const isValidPhone = (phone) => {
        const phoneRegex = /^(0[0-9]{9})$/;
        return phoneRegex.test(phone);
    };

    const calculatePriceMultiplier = (quantity) => {
        if (quantity <= 10) return 1;
        if (quantity <= 20) return 2;
        if (quantity <= 30) return 3;
        return 4;
    };

    const isWithinBusinessHours = (time) => {
        if (!time) return false;
        
        const [hours, minutes] = time.split(':').map(Number);
        const timeInMinutes = hours * 60 + minutes;
        
        const lunch_start = 9 * 60;    
        const lunch_end = 14 * 60;     
        const dinner_start = 18 * 60;  
        const dinner_end = 23 * 60;    
        
        return (timeInMinutes >= lunch_start && timeInMinutes <= lunch_end) ||
               (timeInMinutes >= dinner_start && timeInMinutes <= dinner_end);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'quantity') {
            const quantity = parseInt(value);
            if (quantity <= 0) {
                setValidationErrors(prev => ({
                    ...prev,
                    quantity: 'Số lượng phải lớn hơn 0'
                }));
            } else if (quantity > 40) {
                setValidationErrors(prev => ({
                    ...prev,
                    quantity: 'Số lượng không được vượt quá 40 người'
                }));
            } else {
                setValidationErrors(prev => ({
                    ...prev,
                    quantity: ''
                }));
                
                if (tables.tableType) {
                    const selectedTable = tablesType.find(t => t.tableID === tables.tableType);
                    const multiplier = calculatePriceMultiplier(quantity);
                    const newPrice = selectedTable.tablePrice * multiplier;
                    setTables(prev => ({
                        ...prev,
                        quantity: value,
                        tablePrice: newPrice
                    }));
                    return;
                }
            }
        }

        if (name === 'phone') {
            const numbersOnly = value.replace(/[^\d]/g, '');
            setTables(prev => ({
                ...prev,
                [name]: numbersOnly
            }));
            
            if (numbersOnly.length > 0 && !isValidPhone(numbersOnly)) {
                setValidationErrors(prev => ({
                    ...prev,
                    phone: 'Vui lòng nhập đúng định dạng SĐT với 10 chữ số và bắt đầu bằng số 0'
                }));
            } else {
                setValidationErrors(prev => ({
                    ...prev,
                    phone: ''
                }));
            }
            return;
        }

        if (name === 'time') {
            if (!isWithinBusinessHours(value)) {
                setValidationErrors(prev => ({
                    ...prev,
                    time: 'Vui lòng chọn trong khung giờ 9:00 AM - 2:00 PM or 6:00 PM - 11:00 PM'
                }));
            } else {
                setValidationErrors(prev => ({
                    ...prev,
                    time: ''
                }));
            }
            setTables(prev => ({
                ...prev,
                time: value
            }));
            return;
        }

        setTables(prev => ({
            ...prev,
            [name]: value
        }));

        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        if (name === 'email' && value.trim() !== '') {
            if (!isValidEmail(value)) {
                setValidationErrors(prev => ({
                    ...prev,
                    email: 'Vui lòng nhập địa chỉ email hợp lệ (ví dụ: example@domain.com)'
                }));
            }
        }
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        const errors = {};
        if (!tables.name.trim()) errors.name = 'Tên là bắt buộc';
        if (!tables.phone.trim()) {
            errors.phone = 'Số điện thoại là bắt buộc';
        } else if (!isValidPhone(tables.phone)) {
            errors.phone = 'Vui lòng nhập số điện thoại hợp lệ gồm 10 chữ số và bắt đầu bằng số 0';
        }
        if (!tables.email.trim()) errors.email = 'Email là bắt buộc';
        if (!tables.date.trim()) errors.date = 'Ngày là bắt buộc';
        if (!tables.time.trim()) {
            errors.time = 'Thời gian là bắt buộc';
        } else if (!isWithinBusinessHours(tables.time)) {
            errors.time = 'Vui lòng chọn thời gian giữa 9:00 AM - 2:00 PM hoặc 6:00 PM - 11:00 PM';
        }
        if (!tables.quantity.trim()) errors.quantity = 'Số lượng là bắt buộc';
        if (!tables.tableType.trim()) errors.tableType = 'Vui lòng chọn loại bàn';
        if (!isValidEmail(tables.email)) {
            errors.email = 'Vui lòng nhập địa chỉ email hợp lệ (ví dụ: example@domain.com)';
        }
        if (tables.tableType && tables.quantity) {
            // eslint-disable-next-line no-unused-vars
            const selectedTable = tablesType.find(t => t.tableID === tables.tableType);
            const shift = isWithinBusinessHours(tables.time)
                ? (parseInt(tables.time.split(':')[0], 10) < 15 ? 'lunch' : 'dinner')
                : null;
            if (shift && availableTables[tables.tableType]) {
                const availableQty = availableTables[tables.tableType][shift];
                const tablesNeeded = Math.ceil(parseInt(tables.quantity) / 10);
                if (availableQty < tablesNeeded) {
                    errors.tableType = 'Không đủ bàn trống cho số lượng người bạn chọn!';
                }
            }
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/api/payment/create_payment_url?amount=' + tables.tablePrice, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            tables.tableID = data.TxnRef;
            tables.depositStatus = 'pending';
            await fetch('http://localhost:3000/api/table/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tables)
            });
            window.location.href = data.paymentUrl;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const fetchAvailableTables = async (date, tableType) => {
        try {
            // Lấy số bàn khả dụng cho ca trưa
            const lunchResponse = await fetch(`http://localhost:3000/api/table/avail/${date}/12:00`);
            const lunchData = await lunchResponse.json();
            // Tìm thông tin bàn có tableID tương ứng trong kết quả trả về
            const lunchAvailable = lunchData.find(table => table.tableID === tableType)?.tableQty || 0;
            
            // Lấy số bàn khả dụng cho ca tối
            const dinnerResponse = await fetch(`http://localhost:3000/api/table/avail/${date}/18:00`);
            const dinnerData = await dinnerResponse.json();
            // Tìm thông tin bàn có tableID tương ứng trong kết quả trả về
            const dinnerAvailable = dinnerData.find(table => table.tableID === tableType)?.tableQty || 0;

            setAvailableTables(prev => ({
                ...prev,
                [tableType]: {
                    lunch: lunchAvailable,
                    dinner: dinnerAvailable
                }
            }));
        } catch (error) {
            console.error('Error fetching available tables:', error);
        }
    };

    useEffect(() => {
        if (tables.date) {
            tablesType.forEach(table => {
                fetchAvailableTables(tables.date, table.tableID);
            });
        }
    }, [tables.date, tablesType]);

    // Thêm hàm kiểm tra số lượng bàn có đủ không
    const isTableAvailable = (table, shift) => {
        if (!tables.quantity || !availableTables[table.tableID]) return true;
        
        const availableQty = availableTables[table.tableID][shift];
        // Tính số bàn cần dựa trên số người
        const tablesNeeded = Math.ceil(parseInt(tables.quantity) / 10);
        return availableQty >= tablesNeeded;
    };

    return(
        <>
            <div className={styles.bookingContainer}>
                <a href='/home' className={styles.mainTitle}>TOKYO BITES</a>
                <div className={styles.bookingContentContainer}>
                    <p className={styles.title}>Bạn đã sẵn sàng cho một bữa ăn ngon tại Tokyo Bites?</p>
                    <div className={styles.bookingForm}>
                        <form onSubmit={handlePayment}>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>Số lượng người</label>
                                    <input 
                                        type="number" 
                                        name="quantity" 
                                        value={tables.quantity}
                                        onChange={handleInputChange}
                                        min="1"
                                        max="40"
                                        placeholder="10 peple / table"
                                        className={`${styles.input} ${validationErrors.quantity ? styles.inputError : ''}`}
                                    />
                                    {validationErrors.quantity && 
                                        <span className={styles.errorMessage}>{validationErrors.quantity}</span>
                                    }
                                    {tables.quantity > 0 && tables.quantity <= 40 && (
                                        <span className={styles.infoMessage}>
                                            {tables.quantity <= 10 ? 
                                                "Giá tiêu chuẩn cho 1 bàn 10 người" : 
                                                `${calculatePriceMultiplier(tables.quantity)}x giá tiêu chuẩn cho ${tables.quantity} người`
                                            }
                                        </span>
                                    )}
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Giờ</label>
                                    <input 
                                        type="time" 
                                        name="time" 
                                        value={tables.time}
                                        onChange={handleInputChange}
                                        min="09:00"
                                        max="23:00"
                                        step="1800"
                                        className={validationErrors.time ? styles.inputError : ''}
                                    />
                                    {validationErrors.time && 
                                        <span className={styles.errorMessage}>{validationErrors.time}</span>
                                    }
                                    <span className={styles.infoMessage}>
                                        Giờ mở cửa: 9:00 AM - 2:00 PM, 6:00 PM - 11:00 PM
                                    </span>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Ngày</label>
                                    <input 
                                        type="date" 
                                        name="date" 
                                        value={tables.date}
                                        onChange={handleInputChange}
                                        className={validationErrors.date ? styles.inputError : ''}
                                    />
                                    {validationErrors.date && <span className={styles.errorMessage}>{validationErrors.date}</span>}
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>Tên</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={tables.name}
                                        onChange={handleInputChange}
                                        className={validationErrors.name ? styles.inputError : ''}
                                    />
                                    {validationErrors.name && <span className={styles.errorMessage}>{validationErrors.name}</span>}
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>Số điện thoại</label>
                                    <input 
                                        type="tel"
                                        name="phone"
                                        value={tables.phone}
                                        onChange={handleInputChange}
                                        maxLength="10"
                                        className={`${styles.input} ${validationErrors.phone ? styles.inputError : ''}`}
                                        pattern="[0-9]*"  // This will show number keyboard on mobile devices
                                    />
                                    {validationErrors.phone && (
                                        <span className={styles.errorMessage}>
                                            {validationErrors.phone}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>Email</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={tables.email}
                                        onChange={handleInputChange}
                                        className={`${styles.input} ${validationErrors.email ? styles.inputError : ''}`}
                                    />
                                    {validationErrors.email && (
                                        <span className={styles.errorMessage}>
                                            {validationErrors.email}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>Dịp đặc biệt: (Không bắt buộc)</label>
                                    <input 
                                        type="text" 
                                        name="occasion" 
                                        value={tables.occasion}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>Yêu cầu đặc biệt: (Không đặc biệt)</label>
                                    <input 
                                        type="text" 
                                        name="specialRequest" 
                                        value={tables.specialRequest}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className={styles.table}>
                                <div className={styles.tableInner}>
                                    <label className={styles.tableLabel}>Loại bàn và phí đặt cọc</label>
                                    {validationErrors.tableType && <span className={styles.errorMessage}>{validationErrors.tableType}</span>}
                                    {tablesType.map((table) => {
                                        const isAvailableForLunch = isTableAvailable(table, 'lunch');
                                        const isAvailableForDinner = isTableAvailable(table, 'dinner');
                                        const isDisabled = !isAvailableForLunch && !isAvailableForDinner;

                                        return (
                                            <div 
                                                key={table.tableID}
                                                className={`${styles.tableCard} ${isDisabled ? styles.disabledTable : ''}`}
                                                onClick={() => {
                                                    if (isDisabled) return;

                                                    const selectedTable = tablesType.find(t => t.tableID === table.tableID);
                                                    const quantity = parseInt(tables.quantity) || 0;
                                                    const multiplier = calculatePriceMultiplier(quantity);
                                                    const adjustedPrice = selectedTable.tablePrice * multiplier;
                                                    
                                                    handleInputChange({
                                                        target: {
                                                            name: 'tableType',
                                                            value: table.tableID
                                                        }
                                                    });
                                                    handleInputChange({
                                                        target: {
                                                            name: 'tablePrice',
                                                            value: adjustedPrice
                                                        }
                                                    });
                                                }}
                                            >
                                                <input 
                                                    type="radio" 
                                                    name="selection"
                                                    value={table.tableID}
                                                    checked={tables.tableType === table.tableID}
                                                    disabled={isDisabled}
                                                    onChange={(e) => {
                                                        if (isDisabled) return;
                                                        const selectedTable = tablesType.find(t => t.tableID === e.target.value);
                                                        handleInputChange({
                                                            target: {
                                                                name: 'tableType',
                                                                value: e.target.value
                                                            }
                                                        });
                                                        handleInputChange({
                                                            target: {
                                                                name: 'tablePrice',
                                                                value: selectedTable.tablePrice
                                                            }
                                                        });
                                                    }}
                                                />
                                                <div className={styles.tableContent}>
                                                    <p className={styles.tableName}>{table.tableName}</p>
                                                    <p className={styles.tablePrice}>{table.tablePrice.toLocaleString("vi-VN")} đ</p>
                                                    {availableTables[table.tableID] && (
                                                        <div className={styles.availabilityInfo}>
                                                            <p>Số bàn còn trống:</p>
                                                            <p className={!isAvailableForLunch ? styles.notAvailable : ''}>
                                                                Ca trưa (9:00 - 14:00): {availableTables[table.tableID].lunch} bàn
                                                                {!isAvailableForLunch && tables.quantity && 
                                                                    <span className={styles.errorMessage}> (Không đủ chỗ cho {tables.quantity} người)</span>
                                                                }
                                                            </p>
                                                            <p className={!isAvailableForDinner ? styles.notAvailable : ''}>
                                                                Ca tối (18:00 - 23:00): {availableTables[table.tableID].dinner} bàn
                                                                {!isAvailableForDinner && tables.quantity && 
                                                                    <span className={styles.errorMessage}> (Không đủ chỗ cho {tables.quantity} người)</span>
                                                                }
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className={styles.tableItem}>
                                                    <img src={table.tableIMG} alt={table.tableName} className={styles.tableImg}/>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <p className={styles.depositNote}>Để đảm bảo giữ chỗ tại nhà hàng, quý khách vui lòng đặt cọc trước 50% giá trị bàn 
                            (mức phí sẽ thay đổi tùy theo loại bàn). Phần còn lại sẽ được trừ trực tiếp vào hóa đơn thanh toán cuối cùng.
                            Chúng tôi trân trọng cảm ơn sự thông cảm và hợp tác của quý khách!</p>
                            <button onClick={handlePayment} type="submit" className={styles.submitButton}>Xác nhận & Thanh toán</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default TableBooking;
