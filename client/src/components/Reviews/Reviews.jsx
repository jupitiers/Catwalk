import React from 'react';
import styles from './reviews.module.css';
import ReviewCard from './ReviewCard';
import sampleReviews from './dummyData';

const Reviews = () => (
  <div className={styles.reviewsContainer}>
    <div className={styles.ratingsSorter}>
      <p>248 Reviews, sorted by</p>
      <p>relevance</p>
    </div>
    {/* TODO these will not be hardcoded they will be dynamic */}
    {sampleReviews.results.map((review) => (
      <div key={review.review_id} className={styles.review}><ReviewCard review={review} /></div>
    ))}
  </div>
);

export default Reviews;
