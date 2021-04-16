import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import styles from './reviewCard.module.css';
import {
  emptyStar, fullStar, quarterStar, halfStar, threeQuarterStar,
} from '../../../helpers/starRatings';
import { APIContext } from '../../../state/contexts/APIContext';
import { createStarArray, truncateSummary, truncateBody } from '../../../helpers/reviewCardHelpers';
import { ReviewContext } from '../../../state/contexts/ReviewsContext';
import ReviewImages from './ReviewImages';

const ReviewCard = ({ review }) => {
  const { getAllProducts, markReviewAsHelpful, reportReview } = useContext(APIContext);
  const { feedbackGiven } = useContext(ReviewContext);
  const [showMoreBody, setShowMoreBody] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, []);

  // helper functions for review formatting
  const truncatedSummary = truncateSummary(review);
  const stars = createStarArray(review);
  const [truncatedBody, restOfBody] = truncateBody(review);
  console.log(truncatedBody, restOfBody);

  return (
    <div className={styles.reviewCardContainer}>
      <div className={styles.cardHeader}>
        <div>
          {stars.map((star, idx) => <span key={idx}>{star}</span>)}
        </div>
        <div className={styles.reviewUserDate}>
          <p>
            {/* there is no way to tell if a user is verified in the system that I know of */}
            {/* {review.recommend && (
            <i className="fas fa-check-circle" />
            )} */}
            {review.reviewer_name}
          </p>
          <p>
            {moment(review.date).format('MMMM Do YYYY')}
          </p>
        </div>
      </div>
      <h3>{truncatedSummary}</h3>
      <p className={styles.cardBody}>{truncatedBody}</p>
      {restOfBody && (
        <button
          className={styles.expandBodyButton}
          onClick={() => setShowMoreBody(!showMoreBody)}
        >
        {showMoreBody ? 'Show Less' : 'Show More'}
        </button>
      )}
      {showMoreBody && (
        restOfBody
      )}
      {review.photos.length > 0 && (
        <ReviewImages images={review.photos}/>
      )}
      {review.recommend && (
        <div className={styles.recommended}>
          <i className="fas fa-check-double" />
          <p>I recommend this Product</p>
        </div>
      )}

      {review.response && (
        <div className={styles.cardResponse}>
          <h6>Response from seller:</h6>
          <p>{review.response}</p>
        </div>
      )}
      <div className={styles.cardActions}>
        <p>Helpful?</p>
        <p
          onClick={() => {
            if (!feedbackGiven) {
              markReviewAsHelpful(review.review_id);
            }
          }}
          className={styles.action}
        >
          <span>Yes</span>
        </p>
        <p className={styles.yesCount}>
          (
          {review.helpfulness || 0}
          )
        </p>
        <p>|</p>
        <p
          onClick={() => {
            if (!feedbackGiven) {
              reportReview(review.review_id);
            }
          }}
          className={styles.action}
        >
          <span>Report</span>
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
