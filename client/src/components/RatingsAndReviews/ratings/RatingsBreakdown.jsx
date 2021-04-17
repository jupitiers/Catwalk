import React from 'react';
import styles from './ratingsBreakdown.module.css';

const RatingsBreakdown = () => (
  <div className={styles.breakdownContainer}>
    <div className={styles.breakdownItem}>
      <button>5 stars</button>
      <div className={styles.barContainer}>
        <div className={styles.bar} style={{ width: '80%' }} />
      </div>
    </div>
    <div className={styles.breakdownItem}>
      <button>4 stars</button>
      <div className={styles.barContainer}>
        <div className={styles.bar} style={{ width: '75%' }} />
      </div>
    </div>
    <div className={styles.breakdownItem}>
      <button>3 stars</button>
      <div className={styles.barContainer}>
        <div className={styles.bar} style={{ width: '65%' }} />
      </div>
    </div>
    <div className={styles.breakdownItem}>
      <button>2 stars</button>
      <div className={styles.barContainer}>
        <div className={styles.bar} style={{ width: '15%' }} />
      </div>
    </div>
    <div className={styles.breakdownItem}>
      <button>1 stars</button>
      <div className={styles.barContainer}>
        <div className={styles.bar} style={{ width: '25%' }} />
      </div>
    </div>
  </div>
);

export default RatingsBreakdown;
