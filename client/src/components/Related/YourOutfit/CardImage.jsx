import React from 'react';
import styles from './cardImage.module.css';

const CardImage = props => {
  let thumbnailUrl;
  for (let i = 0; i < props.itemStyle.length; i++) {
    if (props.itemStyle[i][0].product_id == props.outfitId) {
      thumbnailUrl = props.itemStyle[i][0].results[0].photos[0].thumbnail_url;
    }
  }

  return (
    <div className={styles.cardPictureArea} style={{ backgroundImage: `url(${thumbnailUrl})` }}>
      <button className={styles.removeItem}><i className="fas fa-times"></i></button>
    </div>
  )
}

export default CardImage;