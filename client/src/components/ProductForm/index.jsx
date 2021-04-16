import React from 'react';

import styles from './product.module.css';

const ProductForm = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Category</h2>
      <h1>Expanded Product Name</h1>
      <p className={styles.price}>$369</p>
      <p className={styles.select}><b>style</b> selected style</p>
      <form>
        <ul className={styles.ul}>
          {
            [6].map((style, i) => {
              return (
                <li className={styles.li}></li>
              )
            })
          }
      </ul>
      <div className={styles.divDropDown}>

      </div>
      </form>
    </div>
  )
}

export default ProductForm;