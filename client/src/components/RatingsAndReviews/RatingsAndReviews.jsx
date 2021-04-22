import React, { useEffect, useState, useContext } from 'react';
import Ratings from './ratings/Ratings';
import Reviews from './reviews/Reviews';
import styles from './ratingsAndReviews.module.css';
import { ReviewContext } from '../../state/contexts/ReviewsContext';
import { APIContext } from '../../state/contexts/APIContext';
import { CreateReview } from './createReview/CreateReview';

const RatingsAndReviews = () => {
  const {
    reviews, reviewsShowing, setReviewsShowing, showMoreReviews, openCreate, setReviews,
  } = useContext(ReviewContext);
  const { getReviewsByProductId, trackClick } = useContext(APIContext);

  useEffect(() => {
    getReviewsByProductId();
  }, []);

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
              onClick={(e) => {
                trackClick(e, 'reviews widget', new Date());
                showMoreReviews();
              }}
              className={styles.moreReviews}
            >
              More Reviews
            </button>
            )}
            <button
              onClick={(e) => {
                trackClick(e, 'reviews widget', new Date());
                openCreate();
              }}
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
              onClick={(e) => {
                trackClick(e, 'reviews widget', new Date());
                openCreate();
              }}
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
