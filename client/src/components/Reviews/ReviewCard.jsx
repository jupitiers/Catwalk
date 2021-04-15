import React from 'react';
import styles from './reviewCard.module.css';
import moment from 'moment';

const ReviewCard = ({review}) => {
  return (
    <div className={styles.reviewCardContainer}>
      <div className={styles.cardHeader}>
        <div>Stars</div>
        <div className={styles.reviewUserDate}>
        <p>
        <i class="fas fa-check-circle"></i>
        {review.reviewer_name}
        </p>
        <p>
        {moment(review.date).format('MMMM Do YYYY')}</p>
        </div>
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