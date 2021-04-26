import React, { useContext } from 'react';
import styles from './ratingsBreakdown.module.css';
import { ReviewContext } from '../../../state/contexts/ReviewsContext';
import { getStarPercents } from '../../../helpers/ratingsHelpers';

const RatingsBreakdown = () => {
  // context imports
  const {
    metaData,
    filterByStars,
    starSorting,
    starFilter,
    clearFilter,
  } = useContext(ReviewContext);
  // using helper functions
  const percents = getStarPercents(metaData.ratings);

  console.log(metaData);
  return (
    <div className={styles.breakdownContainer}>
      <div className={styles.filterInfo}>
        {starSorting && (
          <>
            <p>
              Displaying
              {' '}
              {starFilter.map((f, idx) => (
                <b className={styles.filter} key={idx}>
                  {f}
                  {' '}
                </b>
              ))}
              {' '}
              Star
              {' '}
              Reviews
            </p>
            <button
              className={styles.clearButton}
              onClick={clearFilter}
            >
              Clear
            </button>
          </>
        )}
      </div>
      {percents.map((percent, idx) => (
        <div key={idx} className={styles.breakdownItem}>
          <button
            className={styles.filterButton}
            onClick={() => filterByStars(percent.star)}
          >
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
