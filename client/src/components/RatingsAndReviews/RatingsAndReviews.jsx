import React, { useEffect, useContext } from 'react';
import Ratings from './ratings/Ratings';
import Reviews from './reviews/Reviews';
import styles from './ratingsAndReviews.module.css';
import { ReviewContext } from '../../state/contexts/ReviewsContext';
import { APIContext } from '../../state/contexts/APIContext';
import { CreateReview } from './createReview/CreateReview';

const RatingsAndReviews = () => {
  // context imports
  const {
    reviews,
    reviewsShowing,
    showMoreReviews,
    openCreate,
  } = useContext(ReviewContext);
  const {
    getReviewsByProductId,
    productId,
  } = useContext(APIContext);

  // Get all reviews by product Id
  useEffect(() => {
    getReviewsByProductId();
  }, [productId]);

  return (
    <div>
      <h2 className={styles.sectionTitle}>RATINGS & REVIEWS</h2>
      {reviews.length > 0 ? (
        <div className={styles.ratingsAndReviewsContainer}>
          <div className={styles.ratings}><Ratings /></div>
          <div className={styles.reviews}><Reviews /></div>
          <div className={styles.reviewActions}>
            {(reviews.length > 2 && reviews.length > reviewsShowing) && (
            <button
              onClick={showMoreReviews}
              className={styles.moreReviews}
            >
              More Reviews
            </button>
            )}
            <button
              onClick={openCreate}
              className={styles.reviewButton}
            >
              Add A Review +
            </button>
          </div>
        </div>
      )
        : (
          <>
            <button
              onClick={openCreate}
              className={styles.firstReviewButton}
            >
              Be the first to add a review
            </button>
          </>
        )}
      <CreateReview />
    </div>
  );
};

export default RatingsAndReviews;
