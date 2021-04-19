import React, {useEffect, useContext} from 'react';
import RelatedItemCard from './RelatedItemCard.jsx';
import styles from './relatedItemsCarousel.module.css';

const RelatedItemsCarousel = props => {
  return (
    <div className={styles.carousel}>
      <button className={styles.carouselButton}><i className="fas fa-angle-left"></i></button>
      {props.data.sampleRelatedId.map((item, index) => {
        return <RelatedItemCard key={index} id={item} />
      })}
      <button className={styles.carouselButton}><i className="fas fa-angle-right"></i></button>
    </div>
  )
}

export default RelatedItemsCarousel;