import React, {useEffect, useContext} from 'react';
import styles from './cardDescription.module.css';

import { APIContext } from '../../../state/contexts/APIContext.js';
import { RelatedContext } from '../../../state/contexts/RelatedContext.js';

const CardDescription = props => {
  const { getProductById, getRelatedProducts, getRelatedProductInfoById } = useContext(APIContext);
  const { relatedProducts, setRelatedProducts, relatedProductInfo, setRelatedProductInfo } = useContext(RelatedContext);

  useEffect(() => {
    getRelatedProductInfoById(props.relatedId);
  }, [])

  let id = props.relatedId;

  let category = relatedProductInfo.category;
  let name = relatedProductInfo.name;
  let price = relatedProductInfo.default_price;
  let stars;

  return (
    <div className={styles.description}>
      <span>{props.data.category}</span>
      <span>{props.data.name}</span>
      <span>{`$${props.data.default_price}`}</span>
      <span>Stars</span>
    </div>
  )
}

export default CardDescription;