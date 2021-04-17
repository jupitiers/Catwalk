import React from 'react';
import styles from './ratings.module.css';
import RatingSummary from './RatingSummary';
import RatingsBreakdown from './RatingsBreakdown';
import RatingsFactors from './RatingsFactors';

// Rating summary
const Ratings = () => (
  <div className={styles.ratingsContainer}>
    <div className={styles.ratingsItem}>
      <RatingSummary />
    </div>
    <div className={styles.ratingsItem}>
      <RatingsBreakdown />
    </div>
    <div className={styles.ratingsItem}>
      <RatingsFactors />
    </div>
  </div>
);

export default Ratings;
