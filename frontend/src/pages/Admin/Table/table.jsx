import { useEffect, useState } from 'react';
import styles from './table.module.css';

function Table(){
    const [tables, setTables] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editTable, setEditTable] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [tableToDelete, setTableToDelete] = useState(null);
    const [showCheckOutModal, setShowCheckOutModal] = useState(false);
    const [checkOutTable, setCheckOutTable] = useState(null);
    const [billTotal, setBillTotal] = useState('');
    
    const fetchTables = async () =>{
        try{
            const response = await fetch("http://localhost:3000/api/table");
            const data = await response.json();
            setTables(data);
        } catch(error){
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        const table = tables.find(t => t._id === id);
        setTableToDelete(table);
        setShowDeleteModal(true);
    }

    const confirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/table/${tableToDelete._id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setTables(tables.filter(table => table._id !== tableToDelete._id));
                setShowDeleteModal(false);
                setTableToDelete(null);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditClick = (table) => {
        const tableDataForEdit = {
            name: table.name || '',
            quantity: table.quantity || '',
            time: table.time || '',
            date: table.date || '',
            phone: table.phone || '',
            email: table.email || '',
            occasion: table.occasion || '',
            specialRequest: table.specialRequest || '',
            tableType: table.tableType || '',
            depositStatus: table.depositStatus || '',
            bill: table.bill || '',
            _id: table._id
        };
        setEditTable(tableDataForEdit);
        setShowEditModal(true);
    }

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditTable(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleEditSave = async () => {
        try {
            const { _id, __v, ...tableData } = editTable;
            const response = await fetch(`http://localhost:3000/api/table/update/${editTable._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tableData)
            });
            if (response.ok) {
                const updatedTable = await response.json();
                setTables(tables.map(t => t._id === editTable._id ? updatedTable : t));
                setShowEditModal(false);
                setEditTable(null);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCheckOut = (table) => {
        setCheckOutTable(table);
        setBillTotal('');
        setShowCheckOutModal(true);
    };

    const handleConfirmCheckOut = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/table/bill/${checkOutTable}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ bill: billTotal })
            });

            if (response.ok) {
                const updatedTable = await response.json();
                setTables(tables.map(t => t._id === checkOutTable ? updatedTable : t));
            }
        } catch (error) {
            console.log(error);
        }
        setShowCheckOutModal(false);
        setCheckOutTable(null);
        setBillTotal('');
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    useEffect(()=>{
        fetchTables();
    }, []);


    return(
        <div className={styles.tableContainer}>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Time</th>
                        <th>Date</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Occasion</th>
                        <th>Special Request</th>
                        <th>Table Type</th>
                        <th>Deposit Status</th>
                        <th>Bill</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tables
                        .sort((a, b) => {
                            const now = new Date();
                            const timeA = new Date(`${a.date}T${a.time}`);
                            const timeB = new Date(`${b.date}T${b.time}`);
                            
                            const diffA = Math.abs(timeA - now);
                            const diffB = Math.abs(timeB - now);
                            
                            return diffA - diffB;
                        })
                        .map((table)=>(
                            <tr key={table._id}>
                                <td>{table.name}</td>
                                <td>{table.quantity}</td>
                                <td>{table.time}</td>
                                <td>{formatDate(table.date)}</td>
                                <td>{table.phone}</td>
                                <td>{table.email}</td>
                                <td>{table.occasion}</td>
                                <td>{table.specialRequest}</td>
                                <td>{table.tableType}</td>
                                <td>{table.depositStatus}</td>
                                <td>
                                {table.bill
                                    ? Number(table.bill).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                    : 'Chưa thanh toán'}
                                </td>
                                <td>
                                    <button 
                                        className={styles.editBtn} 
                                        onClick={() => handleEditClick(table)}
                                    >
                                        Sửa
                                    </button>
                                    <button 
                                        className={styles.deleteBtn} 
                                        onClick={() => handleDelete(table._id)}
                                    >
                                        Xoá
                                    </button>
                                    <button
                                        className={styles.checkOutBtn}
                                        onClick={()=>handleCheckOut(table._id)}
                                    >
                                        Trả bàn
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {showEditModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h2>Edit Reservation</h2>
                            <button 
                                className={styles.closeBtn}
                                onClick={() => setShowEditModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={editTable?.name || ''}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Quantity:</label>
                            <input
                                type="number"
                                name="quantity"
                                value={editTable?.quantity || ''}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Time:</label>
                            <input
                                type="time"
                                name="time"
                                value={editTable?.time || ''}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Date:</label>
                            <input
                                type="date"
                                name="date"
                                value={editTable?.date || ''}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Phone:</label>
                            <input
                                type="tel"
                                name="phone"
                                value={editTable?.phone || ''}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={editTable?.email || ''}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Occasion:</label>
                            <input
                                type="text"
                                name="occasion"
                                value={editTable?.occasion || ''}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Special Request:</label>
                            <textarea
                                name="specialRequest"
                                value={editTable?.specialRequest || ''}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Table Type:</label>
                            <input
                                type="text"
                                name="tableType"
                                value={editTable?.tableType || ''}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Deposit Status:</label>
                            <div className={styles.radioGroup}>
                                <label>
                                    <input
                                        type="radio"
                                        name="depositStatus"
                                        value="paid"
                                        checked={editTable?.depositStatus === "paid"}
                                        onChange={handleEditChange}
                                    />
                                    Paid
                                </label>
                                <label style={{ marginLeft: '16px' }}>
                                    <input
                                        type="radio"
                                        name="depositStatus"
                                        value="unpaid"
                                        checked={editTable?.depositStatus === "unpaid"}
                                        onChange={handleEditChange}
                                    />
                                    Unpaid
                                </label>
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Tổng hoá đơn:</label>
                            <input
                                type="text"
                                name="bill"
                                value={editTable?.bill || ''}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className={styles.modalButtons}>
                            <button onClick={handleEditSave}>Save</button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h2>Confirm Delete</h2>
                            <button 
                                className={styles.closeBtn}
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setTableToDelete(null);
                                }}
                            >
                                ×
                            </button>
                        </div>
                        <p>Are you sure you want to delete reservation for "{tableToDelete?.name}"?</p>
                        <div className={styles.modalButtons}>
                            <button onClick={confirmDelete} className={styles.deleteBtn}>Yes, Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {showCheckOutModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h2>Trả bàn: {checkOutTable?.name}</h2>
                            <button 
                                className={styles.closeBtn}
                                onClick={() => setShowCheckOutModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Nhập tổng giá trị hoá đơn:</label>
                            <input
                                type="number"
                                value={billTotal}
                                onChange={e => setBillTotal(e.target.value)}
                                placeholder="Nhập số tiền (VND)"
                            />
                        </div>
                        <div className={styles.modalButtons}>
                            <button onClick={handleConfirmCheckOut}>Xác nhận</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}       

export default Table;
