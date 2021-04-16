import React, {useEffect, useContext} from 'react';
import RelatedItemCard from './RelatedItemCard.jsx';
import styles from './relatedItemsCarousel.module.css';

const RelatedItemsCarousel = () => {
  return (
    <div className={styles.carousel}>
      <button className={styles.carouselButton}>Left</button>
      <RelatedItemCard />
      <RelatedItemCard />
      <RelatedItemCard />
      <RelatedItemCard />
      <button className={styles.carouselButton}>Right</button>
    </div>
  )
}

export default RelatedItemsCarousel;