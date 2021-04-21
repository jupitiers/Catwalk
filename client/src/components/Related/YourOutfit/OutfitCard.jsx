import React from 'react';
import CardImage from './CardImage.jsx';
import CardDescription from './CardDescription.jsx';
import styles from './outfitCard.module.css';

const OutfitCard = props => {
  return (
    <div className={styles.itemCard}>
      <CardImage outfitId={props.outfitId} data={props.data}/>
      <CardDescription outfitId={props.outfitId} data={props.data}/>
    </div>
  )
}

export default OutfitCard;