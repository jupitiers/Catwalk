import React, {useEffect, useContext, useState} from 'react';
import AddCard from './AddCard.jsx';
import OutfitCard from './OutfitCard.jsx';
import styles from './yourOutfitCarousel.module.css';

const YourOutfitCarousel = props => {
  // track left most outfitcard index
  const [leftIndex, setLeftIndex] = useState(0);
  let outfitItems = props.data.sampleRelatedId;
  let displayedItems = outfitItems.slice(leftIndex, leftIndex + 3);

  // onclick function for right arrow button
  let nextItem = () => {
    setLeftIndex(leftIndex + 1);
  };

  let previousItem = () => {
    setLeftIndex(leftIndex === 0 ? leftIndex - 0: leftIndex - 1);
  };

  return (
    <div className={styles.carousel}>
      {leftIndex === 0 ? <div></div> : <button className={styles.carouselButton} onClick={previousItem}><i className="fas fa-angle-left"></i></button>}
      <AddCard />
      {displayedItems.map((id, index) => {
        return <OutfitCard key={index} outfitId={id} data={props.data}/>
      })}
      {leftIndex === outfitItems.length - 3 ?
        null : <button className={styles.carouselButton} onClick={nextItem}><i className="fas fa-angle-right"></i></button>
      }
    </div>
  )
}

export default YourOutfitCarousel;