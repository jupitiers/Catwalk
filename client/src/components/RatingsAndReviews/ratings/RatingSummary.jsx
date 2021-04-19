import React, { useContext } from 'react';
import styles from './ratingSummary.module.css';
import { ReviewContext } from '../../../state/contexts/ReviewsContext';
import { getAvgRating, createStarArray, getRecommendPercent } from '../../../helpers/ratingsHelpers';

const RatingSummary = () => {
  const { metaData } = useContext(ReviewContext);
  const avgRating = getAvgRating(metaData.ratings);
  const stars = createStarArray(avgRating);
  const percent = getRecommendPercent(metaData.recommended);

  return (
    <div className={styles.summaryContainer}>
      <div className={styles.avgRating}>
        <h2>{avgRating}</h2>
        <div className={styles.starsContainer}>
          {stars.map((star, idx) => <div key={idx}>{star}</div>)}
        </div>
      </div>
      <div className={styles.recommendPercent}>
        <p>
          {' '}
          {`${percent}% of reviews recommend this product`}
        </p>
      </div>
    </div>
  );
};

export default RatingSummary;
