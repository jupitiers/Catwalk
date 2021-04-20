import React, {useEffect, useContext} from 'react';
import RelatedItemsCarousel from './RelatedItems/RelatedItemsCarousel.jsx';
import YourOutfitCarousel from './YourOutfit/YourOutfitCarousel.jsx';
import styles from './index.module.css';

// sample data
import sampleData from './dummyData.js';

const RelatedItemsAndOutfit = () => {
  return (
    <div className={styles.CarouselsContainer}>
      <span className={styles.relatedTitle}><b>Related Items</b></span>
      <RelatedItemsCarousel data={sampleData}/>
      <span className={styles.outfitTitle}><b>Your Outfit</b></span>
      <YourOutfitCarousel data={sampleData}/>
    </div>
  )
}

export default RelatedItemsAndOutfit;