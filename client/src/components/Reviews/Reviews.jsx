import React from 'react';
import styles from './reviews.module.css'
import ReviewCard from './ReviewCard.jsx';
import sampleReviews from './dummyData';

const Reviews = () => {

  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.ratingsSorter}>
        <p>248 Reviews, sorted by</p>
        <p>relevance</p>
      </div>
      {/* TODO these will not be hardcoded they will be dynamic */}
      {sampleReviews.results.map(review => {
        return (
          <div key={review.review_id} className={styles.review}><ReviewCard review={review}/></div>
        )
      })}
    </div>
  )

}

export default Reviews;