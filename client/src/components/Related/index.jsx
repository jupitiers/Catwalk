import React, {useEffect, useContext, useState} from 'react';
import RelatedItemsCarousel from './RelatedItems/RelatedItemsCarousel.jsx';
import YourOutfitCarousel from './YourOutfit/YourOutfitCarousel.jsx';
import styles from './index.module.css';

import { APIContext } from '../../state/contexts/APIContext.js';
import { RelatedContext } from '../../state/contexts/RelatedContext.js';

// sample data
import sampleData from './dummyData.js';

const RelatedItemsAndOutfit = () => {
  return (
    <div className={styles.CarouselsContainer}>
      <span className={styles.relatedTitle}><b>Related Items</b></span>
      <RelatedItemsCarousel data={sampleData} relatedProductIds={relatedProducts}/>
      <span className={styles.outfitTitle}><b>Your Outfit</b></span>
      <YourOutfitCarousel data={sampleData}/>
    </div>
  )
}

export default RelatedItemsAndOutfit;