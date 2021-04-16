import React, {useEffect, useContext} from 'react';
import AddCard from './AddCard.jsx';
import OutfitCard from './OutfitCard.jsx';
import styles from './yourOutfitCarousel.module.css';

const YourOutfitCarousel = () => {
  return (
    <div className={styles.carousel}>
      <button className={styles.carouselButton}>Left</button>
      <AddCard />
      <OutfitCard />
      <OutfitCard />
      <OutfitCard />
      <button className={styles.carouselButton}>Right</button>
    </div>
  )
}

export default YourOutfitCarousel;