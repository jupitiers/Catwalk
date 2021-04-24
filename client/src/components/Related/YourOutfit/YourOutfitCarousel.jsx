import React, {useEffect, useContext, useState} from 'react';
import AddCard from './AddCard.jsx';
import OutfitCard from './OutfitCard.jsx';
import styles from './yourOutfitCarousel.module.css';

import { APIContext } from '../../../state/contexts/APIContext.js';
import { ProductContext } from '../../../state/contexts/ProductContext.js';
import { RelatedContext } from '../../../state/contexts/RelatedContext.js';

const YourOutfitCarousel = props => {
  const { pId, getProductById, getAllOutfitStyles, getAllOutfitReviewMetaData } = useContext(APIContext);
  const { selectedProduct } = useContext(ProductContext);
  const { outfitStyle, setOutfitStyle } = useContext(RelatedContext);

  const[outfitItemsIds, setOutfitItemsIds] = useState([]);
  const[outfitItemsInfo, setOutfitItemsInfo] = useState([]);
  const[outfitItemStyles, setOutfitItemStyles] = useState([]);
  const[reviewData, setReviewData] = useState([]);
  const[isLoading, setIsLoading] = useState(true);

  // track left most outfitcard index
  const [leftIndex, setLeftIndex] = useState(0);
  let outfitItems = outfitItemsIds;
  let displayedItems = outfitItems.slice(leftIndex, leftIndex + 3);

  // onclick function for right arrow button
  let nextItem = () => {
    setLeftIndex(leftIndex + 1);
  };

  let previousItem = () => {
    setLeftIndex(leftIndex === 0 ? leftIndex - 0: leftIndex - 1);
  };

  let addCurrentItem = async () => {
    setIsLoading(true);
    if (!outfitItemsIds.includes(pId)) {
      outfitItemsIds.push(pId);
      outfitItemsInfo.push(selectedProduct);
      await getAllOutfitStyles(outfitItemsIds).then(data => {
        outfitItemStyles.push(data);
      });
      await getAllOutfitReviewMetaData(outfitItemsIds).then(data => {
        reviewData.push(data);
      });
    }
    setIsLoading(false);
  };

  let removeItem = (outfitId) => {
    let itemIndex = outfitItemsIds.indexOf(outfitId);
    let updatedOutfitItemsIds = outfitItemsIds.splice(itemIndex, 1);

    console.log(outfitItemsIds)
  };

  return (
    <div className={styles.carousel}>
      {leftIndex === 0 ? <div></div> : <button className={styles.carouselButton} onClick={previousItem}><i className="fas fa-angle-left"></i></button>}
      <AddCard addCurrentItem={addCurrentItem}/>
      {isLoading ? null : outfitItemsIds.length > 0 && outfitItemsIds.map((id, index) => {
        return <OutfitCard key={index} outfitId={id} itemsInfo={outfitItemsInfo} itemStyle={outfitItemStyles} reviews={reviewData} removeItem={removeItem}/>
      })}
      {(leftIndex === outfitItems.length - 3 || outfitItems.length < 4) ?
        null : <button className={styles.carouselButton} onClick={nextItem}><i className="fas fa-angle-right"></i></button>
      }
    </div>
  )
}

export default YourOutfitCarousel;