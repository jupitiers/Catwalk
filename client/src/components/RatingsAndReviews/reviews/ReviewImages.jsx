import React, {useState} from 'react';
import styles from './reviewImages.module.css';


const ReviewImages = ({images}) => {
  const [display, setDisplay] = useState('none');

  const openOverlay = () => {
    setDisplay('block')
  }
  const closeOverlay = () => {
    setDisplay('none')
  }
return (
  <>
  <p>Reviewer Images: </p>
  <div
  style={{display: display}}
  className={styles.imageOverlay}></div>
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
