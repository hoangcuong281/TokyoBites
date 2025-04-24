import React from 'react';
import styles from './event.module.css';
import Event1 from '../../../assets/Event1.jpg';
import Event2 from '../../../assets/Event2.jpg';
import Event3 from '../../../assets/Event3.jpg';
import Event4 from '../../../assets/Event4.jpg';

const Event = () => {
  
  return (
    <section className={styles.eventsSection}>
      <div className={styles.container}>
        <p className={styles.sectionTitle}>Events</p>
        <div className={styles.imgContainer}>
            <div className={styles.eventContent} style={{backgroundImage: `url(${Event1})`}}>
              <div className={styles.eventTitle}>Private Dining</div>
            </div>
            <div className={styles.eventContent} style={{backgroundImage: `url(${Event2})`}}>
              <div className={styles.eventTitle}>Corporate Events</div>
            </div>
        </div>
        <div className={styles.imgContainer}>
            <div className={styles.eventContent} style={{backgroundImage: `url(${Event3})`}}>
              <div className={styles.eventTitle}>Social Gatherings</div>
            </div>
            <div className={styles.eventContent} style={{backgroundImage: `url(${Event4})`}}>
              <div className={styles.eventTitle}>Special Occasions</div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Event;