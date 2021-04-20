import React from 'react';
import styles from './cardDescription.module.css';

const CardDescription = props => {
  let id = props.outfitId;
  let data = props.data;
  let category = '', name = '', price, stars;

  for (let i = 0; i < data.sampleRelatedInfo.length; i++) {
    if (data.sampleRelatedInfo[i].id === id) {
      category = data.sampleRelatedInfo[i].category;
      name = data.sampleRelatedInfo[i].name;
      price = data.sampleRelatedInfo[i].default_price;
    }
  }

  return (
    <div className={styles.description}>
      <span>{category}</span>
      <span>{name}</span>
      <span>{`$${price}`}</span>
      <span>Stars</span>
    </div>
  )
}

export default CardDescription;