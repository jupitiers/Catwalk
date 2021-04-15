import React from 'react';
import styles from './reviewCard.module.css';
import moment from 'moment';

const ReviewCard = ({review}) => {
  // create array for displaying stars dynamically
  const stars = []
  for (let i = 1; i < review.rating; i++) {
    stars.push(<i class="fas fa-star"></i>)
  }

  return (
    <div className={styles.reviewCardContainer}>
      <div className={styles.cardHeader}>
        <div>
        {stars.map(star => {
          return star
        })}
        </div>
        <div className={styles.reviewUserDate}>
        <p>
        <i class="fas fa-check-circle"></i>
        {review.reviewer_name}
        </p>
        <p>
        {moment(review.date).format('MMMM Do YYYY')}</p>
        </div>
      </div>
      <h3>{review.summary}.</h3>
      <p className={styles.cardBody}>{review.body}</p>
      {review.response && (
        <div className={styles.cardResponse}>
        <h6>Response:</h6>
        <p>{review.response}</p>
        </div>
      )}
      <div className={styles.cardActions}>
      <p>Helpful?</p>
      <p className={styles.action}>Yes</p>
      <p className={styles.yesCount}>({review.helpfulness || 0})</p>
      <p>|</p>
      <p className={styles.action}>Report</p>
      </div>
    </div>
  )

}

export default ReviewCard;