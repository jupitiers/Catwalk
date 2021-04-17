import React from 'react';
import styles from './ratings.module.css';
import RatingSummary from './RatingSummary';

// Rating summary
const Ratings = () => (
  <div className={styles.ratingsContainer}>
    <div className={styles.ratingsItem}>
      <RatingSummary />
    </div>
    <div className={styles.ratingsItem}>
      Breakdown & Recommendations
    </div>
    <div className={styles.ratingsItem}>
      Product Breakdown (Factors)
    </div>
  </div>
);

export default Ratings;
