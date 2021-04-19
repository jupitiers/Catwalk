import React, {useEffect, useContext} from 'react';
import CardPicture from './CardPicture.jsx';
import CardDescription from './CardDescription.jsx';
import styles from './relatedItemCard.module.css';

const RelatedItemCard = () => {
  return (
    <div className={styles.itemCard}>
      <CardPicture />
      <CardDescription />
    </div>
  )
}

export default RelatedItemCard;