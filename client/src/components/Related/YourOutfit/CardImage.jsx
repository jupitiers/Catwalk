import React from 'react';
import styles from './cardImage.module.css';

const CardImage = () => {
  return (
    <div className={styles.cardPictureArea}>
      <img></img>
      <button className={styles.removeItem}>x</button>
    </div>
  )
}

export default CardImage;