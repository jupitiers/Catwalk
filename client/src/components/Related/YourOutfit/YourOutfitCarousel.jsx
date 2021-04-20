import React, {useEffect, useContext} from 'react';
import AddCard from './AddCard.jsx';
import OutfitCard from './OutfitCard.jsx';
import styles from './yourOutfitCarousel.module.css';

const YourOutfitCarousel = () => {
  return (
    <div className={styles.carousel}>
      <button className={styles.carouselButton}><i className="fas fa-angle-left"></i></button>
      <AddCard />
      <OutfitCard />
      <OutfitCard />
      <OutfitCard />
      <button className={styles.carouselButton}><i className="fas fa-angle-right"></i></button>
    </div>
  )
}

export default YourOutfitCarousel;