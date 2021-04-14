import React from 'react';
import styles from './reviews.module.css'
import ReviewCard from './ReviewCard.jsx';

const Reviews = () => {

  return (
    <div className={styles.reviewsContainer}>
    {/* TODO these will not be hardcoded they will be dynamic */}
      <div className={styles.review}><ReviewCard/></div>
      <div className={styles.review}><ReviewCard/></div>
    </div>
  )

}

export default Reviews;