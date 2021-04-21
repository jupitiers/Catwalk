import React, {useEffect, useContext} from 'react';
import styles from './comparisonModal.module.css';

const ComparisonModal = props => {
  let currentId = 17067;
  let comparedId = props.relatedId;

  let currentFeatures = [
    {
        "feature": "Fabric",
        "value": "Canvas"
    },
    {
        "feature": "Buttons",
        "value": "Brass"
    }
  ];

  let getComparedFeatures = () => {
    for (let i = 0; i < props.data.sampleRelatedInfo.length; i++) {
      if (props.data.sampleRelatedInfo[i].id === comparedId) {
        return props.data.sampleRelatedInfo[i].features;
      }
    }
  };

  let comparedFeatures = getComparedFeatures();

  return (
    <div className={styles.modal} onClick={e => {props.onClick(e)}} id="modalBackground">
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h4 className={styles.modalTitle}>COMPARING</h4>
          <div className={styles.productNames}>
            <h5 className={styles.nameOne}>Product 1</h5>
            <h5 className={styles.nameTwo}>Product 2</h5>
          </div>
        </div>
        <div className={styles.modalBody}>
          <p>Hi</p>
          <p>Hi</p>
          <p>Hi</p>
          <p>Hi</p>
          <p>Hi</p>
          <p>Hi</p>
          <p>Hi</p>
          <p>Hi</p>
          <p>Hi</p>
          <p>Hi</p>
          <p>Hi</p>
          <p>Hi</p>
          <p>Hi</p>
        </div>
      </div>
    </div>
  )
}

export default ComparisonModal;