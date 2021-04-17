import React, { useContext } from 'react';
import styles from './ratingSummary.module.css';
import { ReviewContext } from '../../../state/contexts/ReviewsContext';
import { getAvgRating } from '../../../helpers/ratingsHelpers';

const RatingSummary = () => {
  const { metaData } = useContext(ReviewContext);
  console.log(metaData.ratings);
  const avgRating = getAvgRating(metaData.ratings);
  return (
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
};

export default RatingSummary;
