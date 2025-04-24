import styles from './tablebooking.module.css'
import Footer from '../../components/Footer/Footer'
import { useState } from 'react';

function TableBooking(){
    const [validationErrors, setValidationErrors] = useState({});
    let tablesType = [
        {
            tableID:"NORMAL",
            tableIMG:"https://res.cloudinary.com/dqxeupx0u/image/upload/v1745046116/NormalTable_prtirl.jpg",
            tableName:"Normal Table",
            tablePrice: 50000, 
        },
        {
            tableID:"PRENIUM",
            tableIMG:"https://res.cloudinary.com/dqxeupx0u/image/upload/v1745046168/PreniumTable_hol0bu.jpg",
            tableName:"Prenium Table",
            tablePrice: 100000,
        },
        {
            tableID:"VIP",
            tableIMG:"https://res.cloudinary.com/dqxeupx0u/image/upload/v1745046203/VIPTable_r1fba7.jpg",
            tableName:"VIP Table",
            tablePrice: 250000,
        }
    ]
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
        paymentStatus: '',
        tableID: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
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
      };

    const handlePayment = async (e) => {
        e.preventDefault();
        const errors = {};
        if (!tables.name.trim()) errors.name = 'Name is required';
        if (!tables.phone.trim()) errors.phone = 'Phone is required';
        if (!tables.email.trim()) errors.email = 'Email is required';
        if (!tables.date.trim()) errors.date = 'Date is required';
        if (!tables.time.trim()) errors.time = 'Time is required';
        if (!tables.quantity.trim()) errors.quantity = 'Quantity is required';
        if (!tables.tableType.trim()) errors.tableType = 'Please select a table type';
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
            tables.paymentStatus = 'pending';
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

    return(
        <>
            <div className={styles.bookingContainer}>
                <p className={styles.mainTitle}>TOKYO BITES</p>
                <div className={styles.bookingContentContainer}>
                        <p className={styles.title}>Secure Your Seat a Tokyo Bites</p>
                        <div className={styles.bookingForm}>
                            <form onSubmit={handlePayment}>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label>People</label>
                                        <input 
                                            type="number" 
                                            name="quantity" 
                                            value={tables.quantity}
                                            onChange={handleInputChange}
                                            className={validationErrors.quantity ? styles.inputError : ''}
                                        />
                                        {validationErrors.quantity && <span className={styles.errorMessage}>{validationErrors.quantity}</span>}
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Time</label>
                                        <input 
                                            type="time" 
                                            name="time" 
                                            value={tables.time}
                                            onChange={handleInputChange}
                                            className={validationErrors.time ? styles.inputError : ''}
                                        />
                                        {validationErrors.time && <span className={styles.errorMessage}>{validationErrors.time}</span>}
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Date</label>
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
                                        <label>Name</label>
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
                                        <label>Phone</label>
                                        <input 
                                            type="tel" 
                                            name="phone" 
                                            value={tables.phone}
                                            onChange={handleInputChange}
                                            className={validationErrors.phone ? styles.inputError : ''}
                                        />
                                        {validationErrors.phone && <span className={styles.errorMessage}>{validationErrors.phone}</span>}
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
                                            className={validationErrors.email ? styles.inputError : ''}
                                        />
                                        {validationErrors.email && <span className={styles.errorMessage}>{validationErrors.email}</span>}
                                    </div>
                                </div>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label>Occasion: (Optional)</label>
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
                                        <label>Special Request: (Optional)</label>
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
                                    <label className={styles.tableLabel}>Table Type and Deposit Fee</label>
                                    {validationErrors.tableType && <span className={styles.errorMessage}>{validationErrors.tableType}</span>}
                                    {tablesType.map((table) => (
                                        <div 
                                            className={styles.tableCard}
                                            onClick={() => {
                                                const selectedTable = tablesType.find(t => t.tableID === table.tableID);
                                                handleInputChange({
                                                    target: {
                                                        name: 'tableType',
                                                        value: table.tableID
                                                    }
                                                });
                                                handleInputChange({
                                                    target: {
                                                        name: 'tablePrice',
                                                        value: selectedTable.tablePrice
                                                    }
                                                });
                                            }}
                                        >
                                            <input 
                                                type="radio" 
                                                name="selection"
                                                value={table.tableID}
                                                checked={tables.tableType === table.tableID}
                                                onChange={(e) => {
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
                                            </div>
                                            <div className={styles.tableItem}>
                                                <img src={table.tableIMG} alt={table.tableName} className={styles.tableImg}/>
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                                <p className={styles.depositNote}>A deposit fee (price will depend on table type) is required to secure your 
                                table reservation at our restaurant. This amount will be applied to your final 
                                bill. Thank you for your understanding!</p>
                                <button onClick={handlePayment} type="submit" className={styles.submitButton}>Confirm & Pay Deposit</button>
                            </form>
                        </div>
                    </div>
                </div>
            <Footer />
        </>
    )
}

export default TableBooking;
