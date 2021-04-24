import React, {useEffect, useContext, useState} from 'react';
import RelatedItemsCarousel from './RelatedItems/RelatedItemsCarousel.jsx';
import YourOutfitCarousel from './YourOutfit/YourOutfitCarousel.jsx';
import styles from './index.module.css';

// sample data
import sampleData from './dummyData.js';

const RelatedItemsAndOutfit = () => {
  return (
    <div className={styles.CarouselsContainer}>
      <div className={styles.relatedTitle}><h2>RELATED ITEMS</h2></div>
      <RelatedItemsCarousel/>
      <div className={styles.outfitTitle}><h2>YOUR OUTFIT</h2></div>
      <YourOutfitCarousel data={sampleData}/>
    </div>
  )
}

export default RelatedItemsAndOutfit;