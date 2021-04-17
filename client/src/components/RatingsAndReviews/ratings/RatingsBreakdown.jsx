import React, { useContext } from 'react';
import styles from './ratingsBreakdown.module.css';
import { ReviewContext } from '../../../state/contexts/ReviewsContext';
import { getStarPercents } from '../../../helpers/ratingsHelpers';

const RatingsBreakdown = () => {
  const { metaData } = useContext(ReviewContext);
  const percents = getStarPercents(metaData.ratings);

  return (
    <div className={styles.breakdownContainer}>
      {percents.map((percent, idx) => (
        <div key={idx} className={styles.breakdownItem}>
          <button>
            {percent.star}
            {' '}
            stars
          </button>
          <div className={styles.barContainer}>
            <div
              className={styles.bar}
              style={{ width: `${percent[percent.star]}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RatingsBreakdown;
