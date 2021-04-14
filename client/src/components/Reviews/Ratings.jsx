import React from 'react';
import styles from './ratings.module.css'


// Rating summary
const Ratings = () => {

  return (
    <div className={styles.ratingsContainer}>
      <div className={styles.ratingsItem}>
        Rating Summary
      </div>
      <div className={styles.ratingsItem}>
        Breakdown & Recommendations
      </div>
      <div className={styles.ratingsItem}>
        Product Breakdown (Factors)
      </div>
    </div>
  )

}

export default Ratings;