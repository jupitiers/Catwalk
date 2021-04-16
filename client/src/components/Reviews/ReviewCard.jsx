import React, {useContext, useEffect} from 'react';
import styles from './reviewCard.module.css';
import moment from 'moment';
import {emptyStar, fullStar, quarterStar, halfStar, threeQuarterStar} from './starRatings.js'
import { APIContext } from '../../state/contexts/APIContext.js';

const ReviewCard = ({review}) => {
  const {getAllProducts} = useContext(APIContext)

  useEffect(() => {
    getAllProducts();
  }, [])
  // get whole number and percent number
  let fullStars = Math.floor(review.rating);
  let decimal = (review.rating % 1).toFixed(1);
  let partialStar;
  // 0-1 = no star
  if (decimal < 2) {
    partialStar = (emptyStar)
  }
  // 2-3 = 1/4 star
  if (decimal > 1 && decimal < 4) {
    partialStar = (quarterStar)
  }
  // 4-6 = 1/2 star
  if (decimal > 3 && decimal < 7) {
    partialStar = (halfStar)
  }
  // 7-8 = 3/4 star
  if (decimal > 6 && decimal < 9) {
    partialStar = (threeQuarterStar)
  }
  // 9 = full star
  if (decimal > 8 ) {
    partialStar = (fullStar)
  }
  // create array for displaying full stars dynamically
  const stars = []
  for (let i = 1; i < fullStars; i++) {
    stars.push(fullStar)
  }
  // create a max 60 char substring for summary
  let truncatedSummary;
  if (review.summary.length > 60) {
  truncatedSummary = `${review.summary.substring(0, 60)}...`
  } else {
    truncatedSummary = review.summary
  }

  return (
    <div className={styles.reviewCardContainer}>
      <div className={styles.cardHeader}>
        <div>
        {stars.map((star, idx) => {
          return <span key={idx}>{star}</span>
        })}
        </div>
        <div className={styles.reviewUserDate}>
        <p>
        <i className="fas fa-check-circle"></i>
        {review.reviewer_name}
        </p>
        <p>
        {moment(review.date).format('MMMM Do YYYY')}</p>
        </div>
      </div>
      <h3>{truncatedSummary}</h3>
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