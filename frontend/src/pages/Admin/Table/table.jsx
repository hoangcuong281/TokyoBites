import React, { useEffect, useState } from 'react';
import styles from './table.module.css';

function Table() {
    const [tables, setTables] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editTable, setEditTable] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [tableToDelete, setTableToDelete] = useState(null);
    const [showCheckOutModal, setShowCheckOutModal] = useState(false);
    const [checkOutTable, setCheckOutTable] = useState(null);
    const [billTotal, setBillTotal] = useState('');
    const [filter, setFilter] = useState({
        date: '',
        billStatus: '',
        quantity: '',
        tableType: ''
    });
    const [showAddModal, setShowAddModal] = useState(false);
    const [newTable, setNewTable] = useState({
        tableID: 'admin',
        name: '',
        quantity: '',
        time: '',
        date: '',
        phone: '',
        email: '',
        occasion: '',
        specialRequest: '',
        tableType: '',
        depositStatus: '',
        bill: 0
    });
    const [addValidation, setAddValidation] = useState({});

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

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewTable(prev => ({
            ...prev,
            [name]: value
        }));
        setAddValidation(prev => {
            const newErrors = { ...prev };
            if (value && value.toString().trim() !== '') {
                delete newErrors[name];
            }
            return newErrors;
        });
    };

    const handleAddSave = async () => {
        // Validation
        const requiredFields = [
            { key: 'name', label: 'Tên' },
            { key: 'quantity', label: 'Số lượng người' },
            { key: 'time', label: 'Giờ' },
            { key: 'date', label: 'Ngày' },
            { key: 'phone', label: 'Số điện thoại' },
            { key: 'email', label: 'Email' },
            { key: 'tableType', label: 'Loại bàn' },
            { key: 'depositStatus', label: 'Trạng thái đặt cọc' },
        ];
        let errors = {};
        requiredFields.forEach(field => {
            if (field.key === 'tableType' || field.key === 'depositStatus') {
                errors[field.key] = `Vui lòng chọn ${field.label}.`;
            } else {
                errors[field.key] = `Vui lòng nhập ${field.label}.`;
            }
        });
        setAddValidation(errors);
        if (Object.keys(errors).length > 0) return;

        try {
            const response = await fetch('http://localhost:3000/api/table/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTable)
            });
            if (response.ok) {
                const addedTable = await response.json();
                setTables(prev => [...prev, addedTable]);
                setShowAddModal(false);
                setNewTable({
                    tableID: '',
                    name: '',
                    quantity: '',
                    time: '',
                    date: '',
                    phone: '',
                    email: '',
                    occasion: '',
                    specialRequest: '',
                    tableType: '',
                    depositStatus: '',
                    bill: 0
                });
                setAddValidation({});
            }
        } catch (error) {
            console.log(error);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const filteredTables = tables.filter(table => {
        if (filter.date && table.date !== filter.date) return false;
        if (filter.billStatus === 'paid' && !table.bill) return false;
        if (filter.billStatus === 'unpaid' && table.bill) return false;
        if (filter.quantity && Number(table.quantity) !== Number(filter.quantity)) return false;
        if (filter.tableType && table.tableType !== filter.tableType) return false;
        return true;
    });

    useEffect(()=>{
        fetchTables();
    }, []);


    return(
        <div className={styles.tableContainer}>
            <button
                className={styles.addBtn}
                style={{ marginBottom: 16 }}
                onClick={() => setShowAddModal(true)}
            >
                Thêm
            </button>
            <div className={styles.filterContainer}>
                <div className={styles.filterItem}>
                    <label>Ngày: </label>
                    <input
                        className={styles.inputSquare}
                        type="date"
                        value={filter.date}
                        onChange={e => setFilter(f => ({ ...f, date: e.target.value }))}
                    />
                </div>
                <div className={styles.filterItem}>
                    <label>Trạng thái bill: </label>
                    <select
                        className={styles.inputSquare}
                        value={filter.billStatus}
                        onChange={e => setFilter(f => ({ ...f, billStatus: e.target.value }))}
                    >
                        <option value="">Tất cả</option>
                        <option value="paid">Đã thanh toán</option>
                        <option value="unpaid">Chưa thanh toán</option>
                    </select>
                </div>
                <div className={styles.filterItem}>
                    <label>Số lượng người: </label>
                    <input
                        className={styles.inputSquare}
                        type="number"
                        min="1"
                        value={filter.quantity}
                        onChange={e => setFilter(f => ({ ...f, quantity: e.target.value }))}
                        placeholder="VD: 4"
                        style={{ width: 60 }}
                    />
                </div>
                <div className={styles.filterItem}>
                    <label>Loại bàn: </label>
                    <select
                        className={styles.inputSquare}
                        value={filter.tableType}
                        onChange={e => setFilter(f => ({ ...f, tableType: e.target.value }))}
                        style={{ width: 120 }}
                    >
                        <option value="">Tất cả</option>
                        <option value="NORMALTABLE">Bàn thường</option>
                        <option value="PRENIUMTABLE">Bàn cao cấp</option>
                        <option value="VIPTABLE">Bàn VIP</option>
                    </select>
                </div>
                <button 
                    onClick={() => setFilter({ date: '', billStatus: '', quantity: '', tableType: '' })}
                    className={styles.clearFilterBtn}>
                    Xoá lọc
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Số lượng</th>
                        <th>Giờ</th>
                        <th>Ngày</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Dịp đặc biệt</th>
                        <th>Yêu cầu đặc biệt</th>
                        <th>Loại bàn</th>
                        <th>Trạng thái cọc</th>
                        <th>Tổng hoá đơn</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTables
                        .sort((a, b) => {
                            const now = new Date();
                            const timeA = new Date(`${a.date}T${a.time}`);
                            const timeB = new Date(`${b.date}T${b.time}`);
                            const diffA = Math.abs(timeA - now);
                            const diffB = Math.abs(timeB - now);
                            return diffA - diffB;
                        })
                        .map((table) => (
                            <tr
                                key={table._id}
                                className={
                                    table.depositStatus === "paid" && Number(table.bill) > 0
                                        ? styles["row-paid-all"]
                                        : table.depositStatus === "paid"
                                            ? styles["row-paid-deposit"]
                                            : styles["row-unpaid-all"]
                                }
                            >
                                <td>{table.name}</td>
                                <td>{table.quantity}</td>
                                <td>{table.time}</td>
                                <td>{formatDate(table.date)}</td>
                                <td>{table.phone}</td>
                                <td>{table.email}</td>
                                <td>{table.occasion}</td>
                                <td>{table.specialRequest}</td>
                                <td>{table.tableType}</td>
                                <td>
                                    {table.depositStatus === "paid"
                                        ? "Đã thanh toán"
                                        : "Chưa thanh toán"}
                                </td>
                                <td>
                                    {(table.bill && Number(table.bill) !== 0)
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
                                        onClick={() => handleCheckOut(table._id)}
                                    >
                                        Trả bàn
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {/* Add Modal */}
            {showAddModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h2>Thêm đơn đặt bàn</h2>
                            <button
                                className={styles.closeBtn}
                                onClick={() => setShowAddModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Tên:</label>
                            <input
                                type="text"
                                name="name"
                                value={newTable.name}
                                onChange={handleAddChange}
                            />
                            {addValidation.name && <span className={styles.errorMessage}>{addValidation.name}</span>}
                        </div>
                        <div className={styles.formGroup}>
                            <label>Số lượng:</label>
                            <input
                                type="number"
                                name="quantity"
                                value={newTable.quantity}
                                onChange={handleAddChange}
                            />
                            {addValidation.quantity && <span className={styles.errorMessage}>{addValidation.quantity}</span>}
                        </div>
                        <div className={styles.formGroup}>
                            <label>Giờ:</label>
                            <input
                                type="time"
                                name="time"
                                value={newTable.time}
                                onChange={handleAddChange}
                            />
                            {addValidation.time && <span className={styles.errorMessage}>{addValidation.time}</span>}
                        </div>
                        <div className={styles.formGroup}>
                            <label>Ngày:</label>
                            <input
                                type="date"
                                name="date"
                                value={newTable.date}
                                onChange={handleAddChange}
                            />
                            {addValidation.date && <span className={styles.errorMessage}>{addValidation.date}</span>}
                        </div>
                        <div className={styles.formGroup}>
                            <label>Số điện thoại:</label>
                            <input
                                type="tel"
                                name="phone"
                                value={newTable.phone}
                                onChange={handleAddChange}
                            />
                            {addValidation.phone && <span className={styles.errorMessage}>{addValidation.phone}</span>}
                        </div>
                        <div className={styles.formGroup}>
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={newTable.email}
                                onChange={handleAddChange}
                            />
                            {addValidation.email && <span className={styles.errorMessage}>{addValidation.email}</span>}
                        </div>
                        <div className={styles.formGroup}>
                            <label>Dịp đặc biệt:</label>
                            <input
                                type="text"
                                name="occasion"
                                value={newTable.occasion}
                                onChange={handleAddChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Yêu cầu đặc biệt:</label>
                            <textarea
                                name="specialRequest"
                                value={newTable.specialRequest}
                                onChange={handleAddChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Loại bàn:</label>
                            <select
                                name="tableType"
                                value={newTable.tableType}
                                onChange={handleAddChange}
                            >
                                <option value="">Chọn loại bàn</option>
                                <option value="NORMALTABLE">Bàn thường</option>
                                <option value="PRENIUMTABLE">Bàn cao cấp</option>
                                <option value="VIPTABLE">Bàn VIP</option>
                            </select>
                            {addValidation.tableType && <span className={styles.errorMessage}>{addValidation.tableType}</span>}
                        </div>
                        <div className={styles.formGroup}>
                            <label>Trạng thái cọc:</label>
                            <div className={styles.radioGroup}>
                                <label>
                                    <input
                                        type="radio"
                                        name="depositStatus"
                                        value="paid"
                                        checked={newTable.depositStatus === "paid"}
                                        onChange={handleAddChange}
                                    />
                                    Dã thanh toán
                                </label>
                                <label style={{ marginLeft: '16px' }}>
                                    <input
                                        type="radio"
                                        name="depositStatus"
                                        value="unpaid"
                                        checked={newTable.depositStatus === "unpaid"}
                                        onChange={handleAddChange}
                                    />
                                    Chưa thanh toán
                                </label>
                            </div>
                            {addValidation.depositStatus && <span className={styles.errorMessage}>{addValidation.depositStatus}</span>}
                        </div>
                        <div className={styles.formGroup}>
                            <label>Tổng hoá đơn:</label>
                            <input
                                type="text"
                                name="bill"
                                value={newTable.bill}
                                onChange={handleAddChange}
                            />
                        </div>
                        <div className={styles.modalButtons}>
                            <button onClick={handleAddSave}>Lưu</button>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h2>Sửa đơn đặt bàn</h2>
                            <button 
                                className={styles.closeBtn}
                                onClick={() => setShowEditModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Tên:</label>
                            <input
                                type="text"
                                name="name"
                                value={editTable?.name || ''}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Số lượng:</label>
                            <input
                                type="number"
                                name="quantity"
                                value={editTable?.quantity || ''}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Giờ:</label>
                            <input
                                type="time"
                                name="time"
                                value={editTable?.time || ''}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Ngày:</label>
                            <input
                                type="date"
                                name="date"
                                value={editTable?.date || ''}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Số điện thoại:</label>
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
                            <label>Dịp đặc biệt:</label>
                            <input
                                type="text"
                                name="occasion"
                                value={editTable?.occasion || ''}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Yêu cầu đặc biệt:</label>
                            <textarea
                                name="specialRequest"
                                value={editTable?.specialRequest || ''}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Loại bàn:</label>
                            <input
                                type="text"
                                name="tableType"
                                value={editTable?.tableType || ''}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Trạng thái cọc:</label>
                            <div className={styles.radioGroup}>
                                <label>
                                    <input
                                        type="radio"
                                        name="depositStatus"
                                        value="paid"
                                        checked={editTable?.depositStatus === "paid"}
                                        onChange={handleEditChange}
                                    />
                                    Đã thanh toán
                                </label>
                                <label style={{ marginLeft: '16px' }}>
                                    <input
                                        type="radio"
                                        name="depositStatus"
                                        value="unpaid"
                                        checked={editTable?.depositStatus === "unpaid"}
                                        onChange={handleEditChange}
                                    />
                                    Chưa thanh toán
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
                            <button onClick={handleEditSave}>Lưu</button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h2>Xác nhận xóa</h2>
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
                        <p>Bạn có chắc chắn muốn xoá đơn đặt bàn của "{tableToDelete?.name}"?</p>
                        <div className={styles.modalButtons}>
                            <button onClick={confirmDelete} className={styles.deleteBtn}>Có</button>
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
    );
}

export default Table;
