import React, { useEffect, useContext } from 'react';
import styles from './ratings.module.css';
import RatingSummary from './RatingSummary';
import RatingsBreakdown from './RatingsBreakdown';
import RatingsFactors from './RatingsFactors';
import { APIContext } from '../../../state/contexts/APIContext';
import { ReviewContext } from '../../../state/contexts/ReviewsContext';

// Rating summary
const Ratings = () => {
  const { getReviewMetaDataByProductId } = useContext(APIContext);

  useEffect(() => {
    getReviewMetaDataByProductId();
  }, []);

  return (
    <div className={styles.ratingsContainer}>
      <div className={styles.summary}>
        <RatingSummary />
      </div>
      <div className={styles.breakdown}>
        <RatingsBreakdown />
      </div>
      <div className={styles.factors}>
        <RatingsFactors />
      </div>
    </div>
  );
};

export default Ratings;
