import React from 'react';
<<<<<<< HEAD:client/src/components/Reviews/RatingsAndReviews.jsx
import Ratings from './Ratings.jsx';
import Reviews from './Reviews.jsx';
=======
import Ratings from './ratings/Ratings';
import Reviews from './reviews/Reviews';
>>>>>>> 3aea8f8cd356f01d57e2f49e24fc956deef7bf50:client/src/components/RatingsAndReviews/RatingsAndReviews.jsx
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
