import React, { useContext, useEffect, useState } from 'react';
import styles from './reviews.module.css';
import ReviewCard from './ReviewCard';
import { APIContext } from '../../../state/contexts/APIContext';
import { ReviewContext } from '../../../state/contexts/ReviewsContext';

const Reviews = () => {
  const { getReviewsByProductId } = useContext(APIContext);
  const { reviews, reviewsShowing } = useContext(ReviewContext);

  // get reviews on load
  // TODO change the api call to use dynamic id
  useEffect(() => {
    getReviewsByProductId();
  }, []);

  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.ratingsSorter}>
        <p>248 Reviews, sorted by</p>
        <select name="sort-by" id="sort-by">
          <option value="relevance">Relevance</option>
          <option value="helpful">Helpful</option>
          <option value="newest">Newest</option>
        </select>
      </div>
      {/* TODO these will not be hardcoded they will be dynamic */}
      <div className={styles.cardList}>
        {reviews.length > 0 && reviews.slice(0, reviewsShowing).map((review, idx) => (
          <div key={idx} className={styles.review}><ReviewCard review={review} /></div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
