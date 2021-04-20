import React, {useEffect, useContext} from 'react';
import styles from './comparisonModal.module.css';

const ComparisonModal = props => {
  return (
    <div className={styles.modal} onClick={e => {props.onClick(e)}} id="modalBackground">
      <div className={styles.modalContent}>
        <p>Hi</p>
      </div>
    </div>
  )
}

export default ComparisonModal;