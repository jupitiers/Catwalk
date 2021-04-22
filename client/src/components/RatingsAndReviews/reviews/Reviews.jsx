import React, { useContext, useEffect } from 'react';
import styles from './reviews.module.css';
import ReviewCard from './ReviewCard';
import { APIContext } from '../../../state/contexts/APIContext';
import { ReviewContext } from '../../../state/contexts/ReviewsContext';

const Reviews = () => {
  // context imports
  const {
    getReviewsByProductId,
    trackClick,
  } = useContext(APIContext);
  const {
    reviews,
    reviewsShowing,
    setSortTerm,
    sortTerm,
    starFilter,
    getShowCount,
  } = useContext(ReviewContext);

  // get reviews on sort term change
  useEffect(() => {
    getReviewsByProductId();
  }, [sortTerm]);

  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.ratingsSorter}>
        <p>
          Viewing
          {' '}
          { getShowCount() }
          {' '}
          of
          {' '}
          {reviews.length}
          {' '}
          Reviews, sorted by
        </p>
        <select
          name="sort-by"
          id="sort-by"
          onClick={(e) => {
            trackClick(e, 'review widget', new Date());
          }}
          onChange={(e) => { setSortTerm(e.target.value); }}
        >
          <option value="relevant">Relevance</option>
          <option value="helpful">Helpful</option>
          <option value="newest">Newest</option>
        </select>
      </div>
      {/* TODO these will not be hardcoded they will be dynamic */}
      <div className={styles.cardList}>
        {reviews.length > 0 && reviews.slice(0, reviewsShowing)
          .filter((review) => {
            if (starFilter.includes(review.rating.toString())) {
              return review;
            }
          })
          .map((review, idx) => (
            <div key={idx} className={styles.review}><ReviewCard review={review} /></div>
          ))}
      </div>
    </div>
  );
};

export default Reviews;
