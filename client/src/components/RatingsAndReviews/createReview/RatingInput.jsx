import React, { useContext } from 'react';
import styles from './createReview.module.css';
import { ReviewContext } from '../../../state/contexts/ReviewsContext';

export function RatingInput() {
  const {
    stars, errors, changeRating, ratingText,
  } = useContext(ReviewContext);
  return (
    <div className={styles.rating}>
      <h4>
        <b>Overall Rating * </b>
      </h4>
      <span className={styles.errorText}>{errors.rating && errors.rating}</span>
      <div className={styles.stars}>
        {stars.map((star, idx) => (
          <div className={styles.star} key={idx} onClick={() => changeRating(idx)}>
            {star}
          </div>
        ))}
        <p>{ratingText}</p>
      </div>
      {' '}
    </div>
  );
}
