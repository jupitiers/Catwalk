import React, {useEffect, useContext, useState} from 'react';
import styles from './comparisonModal.module.css';

import { APIContext } from '../../../state/contexts/APIContext.js';
import { ProductContext } from '../../../state/contexts/ProductContext.js';
import { RelatedContext } from '../../../state/contexts/RelatedContext.js';

const ComparisonModal = props => {
  const { getRelatedProductInfoById } = useContext(APIContext);
  const { selectedProduct, setSelectedProduct } = useContext(ProductContext);
  const { relatedProducts, setRelatedProducts, relatedProductInfo, setRelatedProductInfo } = useContext(RelatedContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    setIsLoading(true)
    await getRelatedProductInfoById(props.relatedId);
    setIsLoading(false);
  }, []);

  let currentId = selectedProduct.id;
  console.log(currentId)
  let comparedId = props.relatedId;
  console.log(comparedId)

  let currentFeatures = selectedProduct.features;

  let comparedFeatures = relatedProductInfo.features;

  // combined feature comparisons
  let featureComparison = [];
  // looks like below
  // [
  //   {
  //     feature: 'fabric',
  //     currentProduct: 'canvas',
  //     comparedProduct: '', // if not listed as a feature
  //   },

  //   {
  //     feature: 'lenses',
  //     currentProduct: '',
  //     comparedProduct: 'ultrasheen',
  //   },
  // ]

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

  return (isLoading ? null :
    <div className={styles.modal} onClick={e => {props.onClick(e)}} id="modalBackground">
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h4 className={styles.modalTitle}>COMPARING</h4>
          <div className={styles.productNames}>
            <h5 className={styles.nameOne}>{selectedProduct.name}</h5>
            <h5 className={styles.nameTwo}>{relatedProductInfo.name}</h5>
          </div>
        </div>
        <div className={styles.modalBody}>
          {featureComparison.map((data, index) => {
            return <div key={index} className={styles.bodyRow}><p className={styles.rowContentLeft}>{data.currentProduct == null ? <i className="fas fa-check"></i> : data.currentProduct}</p><p className={styles.rowContentCenter}>{data.feature}</p><p className={styles.rowContentRight}>{data.comparedProduct == null ? <i className="fas fa-check"></i> : data.comparedProduct}</p></div>
          })}
        </div>
      </div>
    </div>
  )
}

export default ComparisonModal;