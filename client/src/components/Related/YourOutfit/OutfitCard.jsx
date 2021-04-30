import React from 'react';
import CardImage from './CardImage.jsx';
import CardDescription from './CardDescription.jsx';
import styles from './outfitCard.module.css';

import { getAvgRating } from '../../../helpers/ratingsHelpers';

const OutfitCard = props => {
  let ratings;

  for (let i = 0; i < props.reviews.length; i++) {
    if (props.reviews[i].product_id == props.outfitId) {
      ratings = props.reviews[i].ratings;
    }
  }

  let avgRating = getAvgRating(ratings);

  return (
    <div className={styles.itemCard}>
      <CardImage outfitId={props.outfitId} itemStyle={props.itemStyle} removeItem={props.removeItem}/>
      <CardDescription outfitId={props.outfitId} itemsInfo={props.itemsInfo} rating={avgRating}/>
    </div>
  )
}

export default OutfitCard;