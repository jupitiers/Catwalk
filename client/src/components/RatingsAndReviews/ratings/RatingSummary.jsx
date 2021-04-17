import React, { useContext } from 'react';
import styles from './ratingSummary.module.css';
import { ReviewContext } from '../../../state/contexts/ReviewsContext';
import { getAvgRating, createStarArray } from '../../../helpers/ratingsHelpers';

const RatingSummary = () => {
  const { metaData } = useContext(ReviewContext);
  const avgRating = getAvgRating(metaData.ratings);
  const stars = createStarArray(avgRating);
  return (
    <div className={styles.summaryContainer}>
      <div className={styles.avgRating}>
        <h2>3.5</h2>
        <div className={styles.starsContainer}>
          {stars.map((star) => star)}
        </div>
      </div>
      <div className={styles.recommendPercent}>
        <p> 100% of reviews recommend this product</p>
      </div>
    </div>
  );
};

export default RatingSummary;
