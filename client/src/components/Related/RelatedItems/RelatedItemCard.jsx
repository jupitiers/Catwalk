import React, {useEffect, useContext} from 'react';
import CardPicture from './CardPicture.jsx';
import CardDescription from './CardDescription.jsx';
import styles from './relatedItemCard.module.css';

import { APIContext } from '../../../state/contexts/APIContext.js';
import { RelatedContext } from '../../../state/contexts/RelatedContext.js';

// stars helper functions
import { getAvgRating } from '../../../helpers/ratingsHelpers';

const RelatedItemCard = props => {
  let id = props.relatedId;
  let ratings;
  for (let i = 0; i < props.allReviews.length; i++) {
    if (props.allReviews[i].product_id == id) {
      ratings = props.allReviews[i].ratings;
    }
  }
  let avgRating = getAvgRating(ratings);

  let thumbnailUrl;
  for (let i = 0; i < props.allStyles.length; i++) {
    if (props.allStyles[i].product_id == id) {
      thumbnailUrl = props.allStyles[i].results[0].photos[0].thumbnail_url;
    }
  }
  console.log(avgRating)

  return (
    <div className={styles.itemCard} onClick={() => props.updateCurrentItem(props.relatedId.toString())}>
      <CardPicture relatedId={props.relatedId} thumbnailUrl={thumbnailUrl}/>
      <CardDescription relatedId={props.relatedId} data={props.data} rating={avgRating}/>
    </div>
  )
}

export default RelatedItemCard;