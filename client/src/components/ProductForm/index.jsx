import React, { useState } from 'react';

import styles from './product.module.css';
import { emptyStar } from '../../helpers/starRatings';


const ProductForm = () => {
  console.log({emptyStar})
  const [ inputs, setInputs ] = useState({

  })

  const submit = (e) => {
    e.preventDefault();
  }
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.h2}>Category</h2>
      <h1 className={styles.h1}>Expanded Product Name</h1>
      <p className={styles.price}>$369</p>
      <p className={styles.selectStyle}><b className={styles.bold}>style ></b> selected style</p>
      <form onSubmit={submit}>
        <ul className={styles.ul}>
          {
            [1,2,3,4,5,6,7,8].map((style, i) => {
              return (
                <li className={styles.li} key={i}></li>
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