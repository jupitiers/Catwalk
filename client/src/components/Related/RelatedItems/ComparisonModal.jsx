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

  // combined feature comparisons
  let featureComparison = [];

  let getComparison = () => {
    // loop over currentFeatures
    for (let i = 0; i < currentFeatures.length; i++) {
      for (let key in currentFeatures[i]) {
        // initialize temp object var
        let tempObj = {};
        if (key === 'feature') {
          tempObj.feature = currentFeatures[i].feature;
          tempObj.currentProduct = currentFeatures[i].value;
          tempObj.comparedProduct = '';
          featureComparison.push(tempObj);
        }
      }
    }
    // loop over comparedFeatures
    loop1:
    for (let i = 0; i < comparedFeatures.length; i++) {
      loop2:
      for (let key in comparedFeatures[i]) {
        loop3:
        for (let j = 0; j < featureComparison.length; j++) {
          // if feature already in featureComparison
          if (featureComparison[j].feature === comparedFeatures[i].feature) {
            featureComparison[j].comparedProduct = comparedFeatures[i].value;
            break loop2;
          }
        }
        let tempObj = {};
        if (key === 'feature') {
          tempObj.feature = comparedFeatures[i].feature;
          tempObj.currentProduct = '';
          tempObj.comparedProduct = comparedFeatures[i].value;
          featureComparison.push(tempObj);
        }
      }
    }
  };

  getComparison();
  // console.log(featureComparison)

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
          {/* {} */}
          <div className={styles.bodyRow}>
            <p>1</p>
            <p>2</p>
            <p>3</p>
          </div>
          <div className={styles.bodyRow}>
            <p>1</p>
            <p>2</p>
            <p>3</p>
          </div>
          <div className={styles.bodyRow}>
            <p>1</p>
            <p>2</p>
            <p>3</p>
          </div>
          <div className={styles.bodyRow}>
            <p>1</p>
            <p>2</p>
            <p>3</p>
          </div>
          <div className={styles.bodyRow}>
            <p>1</p>
            <p>2</p>
            <p>3</p>
          </div>
          <div className={styles.bodyRow}>
            <p>1</p>
            <p>2</p>
            <p>3</p>
          </div>
          <div className={styles.bodyRow}>
            <p>1</p>
            <p>2</p>
            <p>3</p>
          </div>
          <div className={styles.bodyRow}>
            <p>1</p>
            <p>2</p>
            <p>3</p>
          </div>
          <div className={styles.bodyRow}>
            <p>1</p>
            <p>2</p>
            <p>3</p>
          </div>
          <div className={styles.bodyRow}>
            <p>1</p>
            <p>2</p>
            <p>3</p>
          </div>
          <div className={styles.bodyRow}>
            <p>1</p>
            <p>2</p>
            <p>3</p>
          </div>
          <div className={styles.bodyRow}>
            <p>1</p>
            <p>2</p>
            <p>3</p>
          </div>
          <div className={styles.bodyRow}>
            <p>1</p>
            <p>2</p>
            <p>3</p>
          </div>
          <div className={styles.bodyRow}>
            <p>1</p>
            <p>2</p>
            <p>3</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComparisonModal;