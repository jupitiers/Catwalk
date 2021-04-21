import React from 'react';
import styles from './cardImage.module.css';

const CardImage = props => {
  return (
    <div className={styles.cardPictureArea}>
      <img></img>
      <button className={styles.removeItem}><i className="fas fa-times"></i></button>
    </div>
  )
}

export default CardImage;