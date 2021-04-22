import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import styles from './reviewCard.module.css';
import { APIContext } from '../../../state/contexts/APIContext';
import { truncateSummary, truncateBody } from '../../../helpers/reviewCardHelpers';
import { createStarArray } from '../../../helpers/ratingsHelpers';
import { ReviewContext } from '../../../state/contexts/ReviewsContext';
import ReviewImages from './ReviewImages';

const ReviewCard = ({ review }) => {
  const {
    getAllProducts, markReviewAsHelpful, reportReview, trackClick,
  } = useContext(APIContext);
  const { feedback } = useContext(ReviewContext);
  const [showMoreBody, setShowMoreBody] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, []);

  // helper functions for review formatting
  const truncatedSummary = truncateSummary(review || {});
  const stars = createStarArray(review.rating);
  const [truncatedBody, restOfBody] = truncateBody(review);

  return (
    <div className={styles.reviewCardContainer}>
      <div className={styles.cardHeader}>
        <div>
          {stars.map((star, idx) => <span key={idx}>{star}</span>)}
        </div>
        <div className={styles.reviewUserDate}>
          <p>
            {review.reviewer_name}
          </p>
          <p>
            {moment(review.date).format('MMMM Do YYYY')}
          </p>
        </div>
      </div>
      <h3>{truncatedSummary}</h3>

      <p className={styles.cardBody}>
        {truncatedBody}
        {(restOfBody && !showMoreBody) && (
          <>
            ...
            <button
              className={styles.expandBodyButton}
              onClick={(e) => {
                trackClick(e, 'reviews widget', new Date());
                setShowMoreBody(!showMoreBody);
              }}
            >
              Show More
            </button>
          </>
        )}
        {showMoreBody && (
          restOfBody
        )}
        {(showMoreBody) && (
        <button
          className={[styles.expandBodyButton, styles.showLess].join(' ')}
          onClick={(e) => {
            trackClick(e, 'reviews widget', new Date());
            setShowMoreBody(!showMoreBody);
          }}
        >
          Show Less
        </button>
        )}
      </p>

      {review.photos.length > 0 && (
        <ReviewImages images={review.photos} />
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
          onClick={(e) => {
            if (!feedback[review.review_id]) {
              trackClick(e, 'reviews widget', new Date());
              markReviewAsHelpful(review.review_id);
            } else {
              trackClick(e, 'reviews widget', new Date());
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
          onClick={(e) => {
            reportReview(review.review_id);
            trackClick(e, 'reviews widget', new Date());
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
