import React from 'react';
import styles from './cardImage.module.css';

const CardImage = props => {
  let thumbnailUrl;
  for (let i = 0; i < props.itemStyle.length; i++) {
    if (props.itemStyle[i][0].product_id == props.outfitId) {
      thumbnailUrl = props.itemStyle[i][0].results[0].photos[0].thumbnail_url;
    }
  }

  return (thumbnailUrl ?
    <div className={styles.cardPictureArea} style={{ backgroundImage: `url(${thumbnailUrl})` }}>
      <button className={styles.removeItem} onClick={() => props.removeItem(props.outfitId)}><i className="fas fa-times"></i></button>
    </div> :
    <div className={styles.cardPictureArea} style={{ backgroundImage: `url(https://customercare.igloosoftware.com/.api2/api/v1/communities/10068556/previews/thumbnails/4fc20722-5368-e911-80d5-b82a72db46f2?width=680&height=680&crop=False)` }}>
      <button className={styles.removeItem} onClick={() => props.removeItem(props.outfitId)}><i className="fas fa-times"></i></button>
    </div>
  )
}

export default CardImage;