import React, {useEffect, useContext} from 'react';
import styles from './cardDescription.module.css';

const CardDescription = props => {
  let index = props.index + props.movement;
  let id = props.relatedId;
  let data = props.data;

  let category = data.sampleRelatedInfo[index].category;
  let name = data.sampleRelatedInfo[index].name;
  let price = data.sampleRelatedInfo[index].default_price;
  let stars;

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