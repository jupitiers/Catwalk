import React from 'react';
import Ratings from './Ratings.jsx';
import Reviews from './Reviews.jsx';
import styles from './ratingsAndReviews.module.css';

const RatingsAndReviews = () => {

  return (
    <div className={styles.ratingsAndReviewsContainer}>
    <div className={styles.ratings}><Ratings/></div>
    <div className={styles.reviews}><Reviews/></div>
    </div>
  )

}

export default RatingsAndReviews;