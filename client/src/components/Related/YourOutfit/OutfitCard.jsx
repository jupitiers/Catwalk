import React from 'react';
import CardImage from './CardImage.jsx';
import CardDescription from './CardDescription.jsx';
import styles from './outfitCard.module.css';

const OutfitCard = () => {
  return (
    <div className={styles.itemCard}>
      <CardImage />
      <CardDescription />
    </div>
  )
}

export default OutfitCard;