import React from 'react';
import styles from './reviewCard.module.css'

const ReviewCard = ({review}) => {
  return (
    <div className={styles.reviewCardContainer}>
      <div className={styles.cardHeader}>
        <div>Stars</div>
        <p>User and Date</p>
      </div>
      <h3> Review title with word-break truncation to prevent wrapping onto the next...</h3>
      <p className={styles.cardBody}>While happily ignoring when being called take a deep sniff of sock then walk around with mouth half open so i like cats because they are fat and fluffy lick yarn hanging out of own butt so spend six hours per day washing,</p>
      <div className={styles.cardResponse}>
      <h6>Response:</h6>
      <p>While happily ignoring when being called take a deep sniff of sock then walk around.</p>
      </div>
      <div className={styles.cardActions}>
      <p>Helpful?</p>
      <p className={styles.action}>Yes</p>
      <p className={styles.yesCount}>(10)</p>
      <p>|</p>
      <p className={styles.action}>Report</p>
      </div>
    </div>
  )

}

export default ReviewCard;