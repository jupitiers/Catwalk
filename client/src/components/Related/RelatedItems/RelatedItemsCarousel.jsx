import React, {useEffect, useContext, useState} from 'react';
import RelatedItemCard from './RelatedItemCard.jsx';
import styles from './relatedItemsCarousel.module.css';

const RelatedItemsCarousel = props => {
  // track left most card
  const [leftIndex, setLeftIndex] = useState(0);
  let relatedItems = props.data.sampleRelatedId;


  return (
    <div className={styles.carousel}>
      <button className={styles.carouselButton}><i className="fas fa-angle-left"></i></button>
      {props.data.sampleRelatedId.map((id, index) => {
        return <RelatedItemCard key={index} relatedId={id} data={props.data}/>
      })}
      <button className={styles.carouselButton}><i className="fas fa-angle-right"></i></button>
    </div>
  )
}

export default RelatedItemsCarousel;