import React, { useState, useContext, useEffect } from 'react';
import { APIContext } from '../../state/contexts/APIContext';
import { ProductContext } from '../../state/contexts/ProductContext';

import styles from './product.module.css';
import { emptyStar } from '../../helpers/starRatings';


const ProductForm = () => {
  const { getProductById } = useContext(APIContext);
  const { selectedProduct, styleList, styleSelected, setStyleSelected } = useContext(ProductContext);
  const [product, setProduct] = useState({})
  const [ inputs, setInputs ] = useState({

  })

  const submit = (e) => {
    e.preventDefault();
  }

  console.log({selectedProduct, styleList, styleSelected})
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.h2}>{selectedProduct.category}</h2>
      <h1 className={styles.h1}>{selectedProduct.name}</h1>
      <p className={styles.price}>${selectedProduct.default_price}</p>
      <p className={styles.selectStyle}><b className={styles.bold}>style ></b> selected style</p>
      <form onSubmit={submit}>
        <ul className={styles.ul}>
          {
            styleList.results && styleList.results.map((s, i) => {
              return (
                <li className={styles.li} key={i} onClick={() => setStyleSelected(s)}>
                  <img src={s.photos[0].thumbnail_url} className={styles.imgStyles} />
                </li>
              )
            })
          }
      </ul>
      <div className={styles.divDropDown}>
          <div className={styles.divSelect}>
              <select className={styles.selectSize}>
                <option className={styles.optionSize}>select size</option>
              </select>
              <select className={styles.selectNum}>
                <option className={styles.optionNum}>1</option>
              </select>
          </div>
          <div className={styles.divButton}>
              <button className={styles.button}>add to bag</button>
              <div className={styles.starLikeDiv}>
                {emptyStar}
              </div>
          </div>
      </div>
      </form>
    </div>
  )
}

export default ProductForm;