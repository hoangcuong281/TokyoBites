import styles from './event.module.css';
import NavBar from "../../components/NavBar/navBar";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from 'react';

function Event() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/event/");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  
  return (
    <div className={styles.teamContainer}>
        <NavBar />
        <div className={styles.topTitle}>
            <p className={styles.eventTitle}>SỰ KIỆN</p>
        </div>  
        <section>
          <div className={styles.eventList}>
            {events.map((event) => (
              <div key={event.id} className={styles.eventItem}>
                <h2 className={styles.eventName}>{event.title}</h2>
                <p className={styles.eventDate}>{new Date(event.date).toLocaleDateString()}</p>
                <p className={styles.eventDescription}>{event.description}</p>
              </div>
            ))}
          </div>
        </section>
        <Footer />
    </div>
  )
}

export default Event