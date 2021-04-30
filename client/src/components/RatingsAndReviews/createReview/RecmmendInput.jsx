import React, { useContext } from 'react';
import styles from './createReview.module.css';
import { ReviewContext } from '../../../state/contexts/ReviewsContext';

export function RecmmendInput() {
  const { changeRecommendation, recommend } = useContext(ReviewContext);
  return (
    <div className={styles.recommend}>
      <p>Do you recommend this product?</p>
      <div className={styles.recommendRadios}>
        <div className={styles.radioChoice}>
          <label htmlFor="yes">Yes</label>
          <input onChange={changeRecommendation} type="radio" name="yes" id="yes" checked={recommend} />
        </div>
        <div className={styles.radioChoice}>
          <label htmlFor="no">No</label>
          <input onChange={changeRecommendation} type="radio" name="no" id="no" checked={!recommend} />
        </div>
      </div>

    </div>
  );
}
