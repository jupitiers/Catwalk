import React from 'react';
import styles from './addCard.module.css';

const AddCard = props => {
  return (
    <div className={styles.itemCard}>
      <div className={styles.cardContents}>
        <button className={styles.addButton} onClick={() => props.addCurrentItem()}><i className="fas fa-plus"></i></button>
        <br></br>
        <span className={styles.addText}>Add to Outfit</span>
      </div>
    </div>
  )
}

export default AddCard;