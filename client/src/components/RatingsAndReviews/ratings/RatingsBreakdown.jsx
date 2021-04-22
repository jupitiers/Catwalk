import React, { useContext } from 'react';
import styles from './ratingsBreakdown.module.css';
import { ReviewContext } from '../../../state/contexts/ReviewsContext';
import { getStarPercents } from '../../../helpers/ratingsHelpers';
import { APIContext } from '../../../state/contexts/APIContext';

const RatingsBreakdown = () => {
  const {
    metaData, filterByStars, starSorting, starFilter, clearFilter,
  } = useContext(ReviewContext);
  const { trackClick } = useContext(APIContext);
  const percents = getStarPercents(metaData.ratings);

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
              onClick={(e) => {
                trackClick(e, 'reviews widget', new Date());
                clearFilter();
              }}
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
            onClick={(e) => {
              trackClick(e, 'reviews widget', new Date());
              filterByStars(percent.star);
            }}
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
