import React, { useEffect, useContext, useState } from 'react';
import RelatedItemCard from './RelatedItemCard.jsx';
import styles from './relatedItemsCarousel.module.css';

import { APIContext } from '../../../state/contexts/APIContext.js';
import { RelatedContext } from '../../../state/contexts/RelatedContext.js';

const RelatedItemsCarousel = (props) => {
  const {
    getRelatedProducts,
    getAllRelatedProductInfo,
    getAllRelatedReviewMetaData,
    getAllRelatedStyles,
    pId,
    getProductById,
    productId,
    setProductId,
  } = useContext(APIContext);
  const {
    relatedProducts,
    setRelatedProducts,
    allRelatedProductInfo,
    setAllRelatedProductInfo,
    relatedReviewMetaData,
    setRelatedReviewMetaData,
    relatedProductStyles,
    setRelatedProductStyles,
  } = useContext(RelatedContext);

  useEffect(() => {
    getRelatedProducts().then((data) => {
      getAllRelatedProductInfo(data);
      getAllRelatedReviewMetaData(data);
      getAllRelatedStyles(data);
    });
  }, [productId]);

  // track left most card index
  const [leftIndex, setLeftIndex] = useState(0);

  // track relative movement of carousel to get true index
  const [movement, setMovement] = useState(0);

  const relatedItems = allRelatedProductInfo.slice();

  // let relatedItems = props.data.sampleRelatedId;
  const displayedItems = relatedItems.slice(leftIndex, leftIndex + 4);

  // onclick function for right arrow button
  const nextItem = () => {
    setLeftIndex(leftIndex + 1);
    setMovement(movement + 1);
  };

  // onclick function for left arrow button
  const previousItem = () => {
    setLeftIndex(leftIndex === 0 ? leftIndex - 0 : leftIndex - 1);
    setMovement(movement === 0 ? movement - 0 : movement - 1);
  };

  const updateCurrentItem = async (e, newId) => {
    e.stopPropagation();

    if (e.target.id !== 'modalBackground' && e.target.id !== 'modalButton') {
      console.log(newId)
      await setProductId(newId.toString());
      console.log(productId)
    }
  };

  return (
    <div className={styles.carousel}>
      {leftIndex === 0 ? <div /> : <button className={styles.carouselButton} onClick={previousItem}><i className="fas fa-angle-left fa-2x" /></button>}
      {displayedItems.length > 0 && displayedItems.map((product, index) => <RelatedItemCard key={index} relatedId={product.id} data={product} allReviews={relatedReviewMetaData} allStyles={relatedProductStyles} updateCurrentItem={updateCurrentItem}/>)}
      {leftIndex === relatedItems.length - 4
        ? null : <button className={styles.carouselButton} onClick={nextItem}><i className="fas fa-angle-right fa-2x" /></button>}
    </div>
  );
};

export default RelatedItemsCarousel;
