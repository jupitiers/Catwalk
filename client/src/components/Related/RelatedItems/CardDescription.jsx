import React, {useEffect, useContext} from 'react';
import styles from './cardDescription.module.css';

const CardDescription = () => {
  return (
    <div className={styles.description}>
      <span>Product Category</span>
      <span>Product Name</span>
      <span>Price</span>
      <span>Stars</span>
    </div>
  )
}

export default CardDescription;