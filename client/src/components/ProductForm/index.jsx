import React from 'react';

import styles from './product.module.css';
import { emptyStar } from '../../helpers/starRatings';


const ProductForm = () => {
  console.log({emptyStar})
  return (
    <div className={styles.wrapper}>
      <h2>Category</h2>
      <h1>Expanded Product Name</h1>
      <p className={styles.price}>$369</p>
      <p className={styles.select}><b>style ></b> selected style</p>
      <form>
        <ul className={styles.ul}>
          {
            [1,2,3,4,5,6].map((style, i) => {
              return (
                <li className={styles.li} key={i}>yes</li>
              )
            })
          }
      </ul>
      <div className={styles.divDropDown}>
          <div className={styles.divSelect}>
              <select className={styles.selectSize}>
                <option>select size</option>
              </select>
              <select className={styles.selectNum}>
                <option>1</option>
              </select>
          </div>
          <div className={styles.divSelect}>
              <button>add to bag</button>
              {emptyStar}
          </div>
      </div>
      </form>
    </div>
  )
}

export default ProductForm;