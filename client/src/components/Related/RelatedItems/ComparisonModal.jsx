import React, {useEffect, useContext} from 'react';
import styles from './comparisonModal.module.css';

const ComparisonModal = () => {
  return (
    <div>
      <button className={styles.modalButton}><i className={"far fa-star"}></i></button>
      {/* <span>Current Product</span>
      <span>Compared Prodcut</span>
      <span>Green</span>
      <span>Color</span>
      <span>Red</span> */}
    </div>
  )
}

export default ComparisonModal;