import React, {useContext, useEffect, useState} from 'react';
import styles from './reviews.module.css'
import ReviewCard from './ReviewCard.jsx';
import sampleReviews from './dummyData';
import { APIContext } from '../../state/contexts/APIContext';
import { ReviewContext } from '../../state/contexts/ReviewsContext';


const Reviews = () => {
  const {getReviewsByProductId} = useContext(APIContext)
  const {reviews} = useContext(ReviewContext)

  // get reviews on load
  // TODO change the api call to use dynamic id
  useEffect(() => {
    getReviewsByProductId();
  }, [])

  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.ratingsSorter}>
        <p>248 Reviews, sorted by</p>
        <p>relevance</p>
      </div>
      {/* TODO these will not be hardcoded they will be dynamic */}
      {reviews.length > 0 && reviews.slice(0, 2).map((review, idx) => {
        return (
          <div key={idx} className={styles.review}><ReviewCard review={review}/></div>
        )
      })}
    </div>
  )

}

export default Reviews;