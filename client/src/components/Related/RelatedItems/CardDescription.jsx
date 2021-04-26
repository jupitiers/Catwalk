import React, {useEffect, useContext} from 'react';
import styles from './cardDescription.module.css';

import { APIContext } from '../../../state/contexts/APIContext.js';
import { RelatedContext } from '../../../state/contexts/RelatedContext.js';

import { createStarArray } from '../../../helpers/ratingsHelpers';

const CardDescription = props => {
  const { getProductById, getRelatedProducts, getRelatedProductInfoById } = useContext(APIContext);
  const { relatedProducts, setRelatedProducts, relatedProductInfo, setRelatedProductInfo } = useContext(RelatedContext);

  let stars = createStarArray(props.rating);
  useEffect(() => {
    getRelatedProductInfoById(props.relatedId);
  }, [])
  return (
    <div className={styles.description}>
      <div>{props.data.category}</div>
      <div>{props.data.name}</div>
      <div>{`$${props.data.default_price}`}</div>
      <div className={styles.starsContainer}>{stars.map((star, idx) => <div key={idx}>{star}</div>)}</div>
    </div>
  )
}

export default CardDescription;