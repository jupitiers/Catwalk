import React from 'react';
import styles from './cardDescription.module.css';

import { createStarArray } from '../../../helpers/ratingsHelpers';

const CardDescription = props => {
  let category, name, price;

  for (let i = 0; i < props.itemsInfo.length; i++) {
    if (props.itemsInfo[i].id == props.outfitId) {
      category = props.itemsInfo[i].category;
      name = props.itemsInfo[i].name;
      price = props.itemsInfo[i].default_price;
    }
  }

  const stars = createStarArray(props.rating);

  return (
    <div className={styles.description}>
      <div>{category}</div>
      <div>{name}</div>
      <div>{`$${price}`}</div>
      <div className={styles.starsContainer}>{stars.map((star, idx) => <div key={idx}>{star}</div>)}</div>
    </div>
  )
}

export default CardDescription;