import React, { useContext } from 'react';
import styles from './ratingsBreakdown.module.css';
import { ReviewContext } from '../../../state/contexts/ReviewsContext';
import { getStarPercents } from '../../../helpers/ratingsHelpers';

const RatingsBreakdown = () => {
  const { metaData } = useContext(ReviewContext);
  const percents = getStarPercents(metaData.ratings);

  return (
    <div className={styles.breakdownContainer}>
      <div className={styles.breakdownItem}>
        <button>5 stars</button>
        <div className={styles.barContainer}>
          <div
            className={styles.bar}
            style={{ width: `${percents['5']}%` }}
          />
        </div>
      </div>
      <div className={styles.breakdownItem}>
        <button>4 stars</button>
        <div className={styles.barContainer}>
          <div
            className={styles.bar}
            style={{ width: `${percents['4']}%` }}
          />
        </div>
      </div>
      <div className={styles.breakdownItem}>
        <button>3 stars</button>
        <div className={styles.barContainer}>
          <div
            className={styles.bar}
            style={{ width: `${percents['3']}%` }}
          />
        </div>
      </div>
      <div className={styles.breakdownItem}>
        <button>2 stars</button>
        <div className={styles.barContainer}>
          <div
            className={styles.bar}
            style={{ width: `${percents['2']}%` }}
          />
        </div>
      </div>
      <div className={styles.breakdownItem}>
        <button>1 stars</button>
        <div className={styles.barContainer}>
          <div
            className={styles.bar}
            style={{ width: `${percents['1']}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default RatingsBreakdown;
