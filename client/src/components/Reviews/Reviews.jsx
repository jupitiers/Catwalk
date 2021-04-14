import React from 'react';
import styles from './reviews.module.css'

const Reviews = () => {

  return (
    <div className={styles.reviewsContainer}>
    {/* TODO these will not be hardcoded they will be dynamic */}
      <div className={styles.review}></div>
      <div className={styles.review}></div>
    </div>
  )

}

export default Reviews;