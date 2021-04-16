import React, { useEffect, useState, useContext } from 'react';
import Ratings from './ratings/Ratings';
import Reviews from './reviews/Reviews';
import styles from './ratingsAndReviews.module.css';
import { ReviewContext } from '../../state/contexts/ReviewsContext';
import { APIContext } from '../../state/contexts/APIContext';

const RatingsAndReviews = () => {
  const {
    reviews, reviewsShowing, setReviewsShowing, showMoreReviews,
  } = useContext(ReviewContext);
  const { getReviewsByProductId } = useContext(APIContext);

  useEffect(() => {
    getReviewsByProductId();
  }, []);

  return (
    <>
      <h2 className={styles.sectionTitle}>RATINGS & REVIEWS</h2>
      <div className={styles.ratingsAndReviewsContainer}>
        <div className={styles.ratings}><Ratings /></div>
        <div className={styles.reviews}><Reviews /></div>
        <div className={styles.reviewActions}>
          {(reviews.length > 2 && reviews.length > reviewsShowing) && (
          <button onClick={showMoreReviews} className={styles.reviewButton}>More Reviews</button>
          )}
          <button className={styles.reviewButton}>Add A Review +</button>
        </div>
      </div>
    </>
  );
};

export default RatingsAndReviews;
