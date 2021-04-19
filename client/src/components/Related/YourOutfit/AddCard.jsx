import React from 'react';
import styles from './addCard.module.css';

const AddCard = () => {
  return (
    <div className={styles.itemCard}>
      <div className={styles.cardContents}>
        <button>+</button>
        <span>Add to Outfit</span>
      </div>
    </div>
  )
}

export default AddCard;