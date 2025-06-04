import styles from './event.module.css';
import { useState, useEffect } from 'react';

function EventManagement() {
    const [events, setEvents] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteEvent, setdeleteEvent] = useState(null);
    const [editEvent, seteditEvent] = useState(null);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        date: ''
    });
    const [addValidation, setAddValidation] = useState({});

    const fetchEvents = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/event/");
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleAdd = async () => {
        let errors = {};
        if (!newEvent.title.trim()) errors.title = "Vui lòng nhập tiêu đề.";
        if (!newEvent.description.trim()) errors.description = "Vui lòng nhập mô tả.";
        if (!newEvent.date) errors.date = "Vui lòng chọn ngày.";
        setAddValidation(errors);
        if (Object.keys(errors).length > 0) return;

        try {
            const response = await fetch("http://localhost:3000/api/event/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newEvent)
            });
            if (response.ok) {
                const addedEvent = await response.json();
                setEvents(prevEvents => [...prevEvents, addedEvent]);
                setShowAddModal(false);
                setNewEvent({ title: '', description: '', date: '' });
                setAddValidation({});
            }
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };
    const handleEdit = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/event/${editEvent._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editEvent)
            });
            if (response.ok) {
                const updatedEvent = await response.json();
                setEvents(prevEvents =>
                    prevEvents.map(event =>
                        event._id === updatedEvent._id ? updatedEvent : event
                    )
                );
                setShowEditModal(false);
                seteditEvent(null);
            }
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    const confirmDelete = async () => {
        try {
        const response = await fetch(`http://localhost:3000/api/event/${deleteEvent._id}`, {
            method: "DELETE"
        });
        if (response.ok) {
            setEvents(events.filter(event => event._id !== deleteEvent._id));
            setShowDeleteModal(false);
            setdeleteEvent(null);
        } else {
            console.error("Failed to delete event");
        }
        } catch (error) {
        console.error("Error deleting event:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent(prevData => ({
            ...prevData,
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

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        seteditEvent(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditSave = () => {
        handleEdit(editEvent);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button onClick={() => setShowAddModal(true)} className={styles.buttonAdd}>Thêm</button>
            </div>
            {showAddModal && (
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <h2>Thêm sự kiện mới:</h2>
                    <div className={styles.formGroup}>
                        <label>Tiêu đề:</label>
                        <input
                            type="text"
                            name="title"
                            value={newEvent.title}
                            onChange={handleInputChange}
                        />
                        {addValidation.title && <span className={styles.errorMsg}>{addValidation.title}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label>Mô tả:</label>
                        <textarea
                            name="description"
                            value={newEvent.description}
                            onChange={handleInputChange}
                        />
                        {addValidation.description && <span className={styles.errorMsg}>{addValidation.description}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label>Ngày:</label>
                        <input
                            type="date"
                            name="date"
                            value={newEvent.date}
                            onChange={handleInputChange}
                        />
                        {addValidation.date && <span className={styles.errorMsg}>{addValidation.date}</span>}
                    </div>
                    <div className={styles.modalButtons}>
                        <button onClick={handleAdd}>Save</button>
                        <button onClick={() => {
                            setShowAddModal(false);
                            setNewEvent({ title: '', description: '', date: '' });
                            setAddValidation({});
                        }}>Cancel</button>
                    </div>
                </div>
            </div>
            )}
            {showEditModal && (
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                <h2>Sửa sự kiện</h2>
                <div className={styles.formGroup}>
                    <label>Tiêu đề:</label>
                    <input
                    type="text"
                    name="name"
                    value={editEvent?.title || ''}
                    onChange={handleEditChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Mô tả:</label>
                    <textarea
                    name="description"
                    value={editEvent?.description || ''}
                    onChange={handleEditChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Ngày:</label>
                    <input
                        type="date"
                        name="date"
                        value={editEvent.date}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.modalButtons}>
                    <button onClick={handleEditSave}>Lưu</button>
                    <button onClick={() => setShowEditModal(false)}>Huỷ</button>
                </div>
                </div>
            </div>
            )}
            {showDeleteModal && (
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                <h2>Xác nhận xoá</h2>
                <p>Bạn có chắc chắn xoá sự kiện "{deleteEvent?.title}"?</p>
                <div className={styles.modalButtons}>
                    <button onClick={confirmDelete} className={styles.buttonDelete}>Có</button>
                    <button onClick={() => {
                    setShowDeleteModal(false);
                    setdeleteEvent(null);
                    }}>Huỷ</button>
                </div>
                </div>
            </div>
            )}
            <div className={styles.menuItems}>
            {events
                .map((event) => (
                <div key={event._id} className={styles.card}>
                    <div key={event.id} className={styles.eventItem}>
                        <h2 className={styles.eventName}>{event.title}</h2>
                        <p className={styles.eventDate}>{new Date(event.date).toLocaleDateString()}</p>
                        <p className={styles.eventDescription}>{event.description}</p>
                        <div className={styles.cardButtons}>
                            <button onClick={() => {
                                seteditEvent(event);
                                setShowEditModal(true);
                            }} className={styles.buttonEdit}>Sửa</button>
                            <button onClick={() => {
                                setdeleteEvent(event);
                                setShowDeleteModal(true);
                            }} className={styles.buttonDelete}>Xoá</button>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

export default EventManagement