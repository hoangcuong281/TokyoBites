import { useEffect, useState } from 'react';
import styles from './table.module.css';

function Table(){
    const [tables, setTables] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editTable, setEditTable] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [tableToDelete, setTableToDelete] = useState(null);
    
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
            paymentStatus: table.paymentStatus || '',
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

    // Thêm hàm formatDate
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
                        <th>Payment Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tables
                        .sort((a, b) => {
                            const now = new Date();
                            const timeA = new Date(`${a.date}T${a.time}`);
                            const timeB = new Date(`${b.date}T${b.time}`);
                            
                            // Tính khoảng cách thời gian đến hiện tại (giá trị tuyệt đối)
                            const diffA = Math.abs(timeA - now);
                            const diffB = Math.abs(timeB - now);
                            
                            // Sắp xếp theo khoảng cách gần nhất với hiện tại
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
                                <td>{table.paymentStatus}</td>
                                <td>
                                    <button 
                                        className={styles.editBtn} 
                                        onClick={() => handleEditClick(table)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className={styles.deleteBtn} 
                                        onClick={() => handleDelete(table._id)}
                                    >
                                        Delete
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
                            <label>Payment Status:</label>
                            <input
                                type="text"
                                name="paymentStatus"
                                value={editTable?.paymentStatus || ''}
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
        </div>
    )
}       

export default Table;
