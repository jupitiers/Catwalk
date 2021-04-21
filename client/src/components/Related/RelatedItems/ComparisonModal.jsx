import React, {useEffect, useContext} from 'react';
import styles from './comparisonModal.module.css';

const ComparisonModal = props => {
  return (
    <div className={styles.modal} onClick={e => {props.onClick(e)}} id="modalBackground">
      <div className={styles.modalContent}>
        <span className={styles.modalHeader}>
          <h4>COMPARING</h4>
          <span className={styles.productNames}>
            <h5>Product 1</h5>
            <h5>Product 2</h5>
          </span>
        </span>

      </div>
    </div>
  )
}

export default ComparisonModal;