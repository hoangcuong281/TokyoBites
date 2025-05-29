import React from 'react';
import styles from './event.module.css';

function Event() {
  
  return (
    <section className={styles.eventsSection}>
      <div className={styles.container}>
        <p className={styles.sectionTitle}>Events</p>
        <div className={styles.imgContainer}>
            <div className={styles.eventContent} style={{backgroundImage: `url(https://res.cloudinary.com/dqxeupx0u/image/upload/v1741682687/Event1_ean6xr.jpg)`}}>
              <div className={styles.eventTitle}>Private Dining</div>
            </div>
            <div className={styles.eventContent} style={{backgroundImage: `url(https://res.cloudinary.com/dqxeupx0u/image/upload/v1741682687/Event1_ean6xr.jpg)`}}>
              <div className={styles.eventTitle}>Corporate Events</div>
            </div>
        </div>
        <div className={styles.imgContainer}>
            <div className={styles.eventContent} style={{backgroundImage: `url(https://res.cloudinary.com/dqxeupx0u/image/upload/v1741682687/Event1_ean6xr.jpg)`}}>
              <div className={styles.eventTitle}>Social Gatherings</div>
            </div>
            <div className={styles.eventContent} style={{backgroundImage: `url(https://res.cloudinary.com/dqxeupx0u/image/upload/v1741682687/Event1_ean6xr.jpg)`}}>
              <div className={styles.eventTitle}>Special Occasions</div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Event;