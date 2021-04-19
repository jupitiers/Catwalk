import React, {useEffect, useContext} from 'react';
import RelatedItemsCarousel from './RelatedItems/RelatedItemsCarousel.jsx';
import YourOutfitCarousel from './YourOutfit/YourOutfitCarousel.jsx';
import styles from './index.module.css';

const RelatedItemsAndOutfit = () => {
  return (
    <div className={styles.CarouselsContainer}>
      <span>Related Items</span>
      <RelatedItemsCarousel />
      <span>Your Outfit</span>
      <YourOutfitCarousel />
    </div>
  )
}

export default RelatedItemsAndOutfit;