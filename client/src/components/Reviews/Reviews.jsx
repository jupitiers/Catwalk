import React from 'react';
import styles from './reviews.module.css'
import ReviewCard from './ReviewCard.jsx';

const Reviews = () => {

  return (
    <div className={styles.reviewsContainer}>
    <div className={styles.ratingsSorter}>
        <p>248 Reviews, sorted by</p>
        <p>relevance</p>
      </div>
    {/* TODO these will not be hardcoded they will be dynamic */}
      <div className={styles.review}><ReviewCard/></div>
      <div className={styles.review}><ReviewCard/></div>
    </div>
  )

}

export default Reviews;