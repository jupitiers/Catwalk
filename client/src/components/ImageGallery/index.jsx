import React, { useState, useEffect } from 'react';
import styles from './image.module.css';

const ImageGallery = () => {

  const [ images, setImages ] = useState([
    {
      src: 'https://i.imgur.com/CWbILwR.jpg',
      active: true
    },
    {
      src: 'https://i.imgur.com/zD7uTjm.jpg',
      active: false
    },
    {
      src: 'https://i.imgur.com/jXLpARE.jpg',
      active: false
    },
    {
      src: 'https://i.imgur.com/CWbILwR.jpg',
      active: false
    },
    {
      src: 'https://i.imgur.com/zD7uTjm.jpg',
      active: false
    },
    {
      src: 'https://i.imgur.com/jXLpARE.jpg',
      active: false
    }
  ])

  const [ mainImg, setMainImg ] = useState(images[0])

  return (
    <div className={styles.wrapper}>
      <i className={`fas fa-expand ${styles.expand}`}></i>
      <div className={styles.imgDiv}>
        <div className={styles.thumbNailDiv}>
          {
            images.map((img, i) => {
              return <img src={img.src} className={img.active ? styles.active : styles.thumbNailImg} key={i}/>
            })
          }
          <i className={`fas fa-arrow-down ${styles.arrowDown}`}></i>
        </div>
        <div className={styles.arrowDiv}>
          <i className={`fas fa-arrow-left ${styles.arrowLeft}`}></i>
          <img src={mainImg.src} className={styles.mainImg} />
          <i className={`fas fa-arrow-right ${styles.arrowRight}`}></i>
        </div>
      </div>
    </div>
  )
}

export default ImageGallery;