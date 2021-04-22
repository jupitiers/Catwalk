import React, {useEffect, useContext, useState} from 'react';
import RelatedItemsCarousel from './RelatedItems/RelatedItemsCarousel.jsx';
import YourOutfitCarousel from './YourOutfit/YourOutfitCarousel.jsx';
import styles from './index.module.css';

import { APIContext } from '../../state/contexts/APIContext.js';
import { RelatedContext } from '../../state/contexts/RelatedContext.js';

// sample data
import sampleData from './dummyData.js';

const RelatedItemsAndOutfit = () => {
  const { getRelatedProducts, getRelatedProductInfoById } = useContext(APIContext);
  const { relatedProducts, setRelatedProducts, relatedProductInfo, setRelatedProductInfo } = useContext(RelatedContext);

  useEffect(() => {
    getRelatedProducts();
  });

  let data = [];
  relatedProducts.forEach(product => {
    getRelatedProductInfoById(product)
      .then(() => data.push(relatedProductInfo))
      .catch(err => console.log(err));
  });

  console.log(data);

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