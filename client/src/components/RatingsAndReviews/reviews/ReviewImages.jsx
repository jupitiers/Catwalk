import React from 'react';
import styles from './reviewImages.module.css';


const ReviewImages = ({images}) => {
return (
  <>
  <p>Reviewer Images: </p>
  <div className={styles.imagesContainer}>
  {images.slice(0, 7).map(image => {
    return (
      <div
      key={image.id}
      className={styles.imageWrapper}
      style={{backgroundImage: `url(${image.url})`}}>
    </div>
    )
  })}
  </div>
  </>
)
}

export default ReviewImages;
