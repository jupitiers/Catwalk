import React, {useEffect, useContext, useState} from 'react';
import RelatedItemCard from './RelatedItemCard.jsx';
import styles from './relatedItemsCarousel.module.css';

const RelatedItemsCarousel = props => {
  // track left most card index
  const [leftIndex, setLeftIndex] = useState(0);
  let relatedItems = props.data.sampleRelatedId;
  let displayedItems = relatedItems.slice(leftIndex, leftIndex + 4);
  // console.log(displayedItems)
  // console.log(props.data)

  // onclick function for right arrow button
  let nextItem = () => {
    setLeftIndex(leftIndex + 1);
  };
  console.log(leftIndex)

  // onclick function for left arrow button
  let previousItem = () => {
    setLeftIndex(leftIndex === 0 ? leftIndex - 0 : leftIndex - 1);
  };

  return (
    <div className={styles.carousel}>
      <button className={styles.carouselButton} onClick={previousItem}><i className="fas fa-angle-left"></i></button>
      {displayedItems.map((id, index) => {
        return <RelatedItemCard key={index} relatedId={id} data={props.data}/>
      })}
      <button className={styles.carouselButton} onClick={nextItem}><i className="fas fa-angle-right"></i></button>
    </div>
  )
}

export default RelatedItemsCarousel;