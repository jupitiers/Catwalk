import React from 'react';
import Ratings from './Ratings';
import Reviews from './Reviews';
import styles from './ratingsAndReviews.module.css';

const RatingsAndReviews = () => (
  <>
    <h2 className={styles.sectionTitle}>RATINGS & REVIEWS</h2>
    <div className={styles.ratingsAndReviewsContainer}>
      <div className={styles.ratings}><Ratings /></div>
      <div className={styles.reviews}><Reviews /></div>
      <div className={styles.reviewActions}>
        <button className={styles.reviewButton}>More Reviews</button>
        <button className={styles.reviewButton}>Add A Review +</button>
      </div>
    </div>
  </>
);

export default RatingsAndReviews;
