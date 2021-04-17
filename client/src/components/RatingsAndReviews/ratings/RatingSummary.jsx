import React from 'react';
import styles from './ratingSummary.module.css';

const RatingSummary = () => (
  <div className={styles.summaryContainer}>
    <div className={styles.avgRating}>
      <h2>3.5</h2>
      <h2>Stars</h2>
    </div>
    <div className={styles.recommendPercent}>
      <p> 100% of reviews recommend this product</p>
    </div>
  </div>
);

export default RatingSummary;
