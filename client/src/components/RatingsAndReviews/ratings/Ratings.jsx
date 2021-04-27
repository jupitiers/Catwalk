import React, { useEffect, useContext } from 'react';
import styles from './ratings.module.css';
import RatingSummary from './RatingSummary';
import RatingsBreakdown from './RatingsBreakdown';
import RatingsFactors from './RatingsFactors';
import { APIContext } from '../../../state/contexts/APIContext';

const Ratings = () => {
  // context imports
  const { getReviewMetaDataByProductId, productId } = useContext(APIContext);

  // get current review metadata on initial render
  useEffect(() => {
    getReviewMetaDataByProductId();
  }, [productId]);

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
