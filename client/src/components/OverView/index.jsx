import React from 'react';

import ImageGallery from '../ImageGallery/index.jsx';
import Product from '../Product/index.jsx';

import styles from './overview.module.css';

const OverView = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.messageP}>site-wide announcement message! - sale / discount <b>offer</b> - <u>new product hightlight</u></p>
      <div className={styles.secWrapper}>
        <section className={styles.secOne}>
          <ImageGallery />
        </section>
        <section className={styles.secTwo}>
          <Product />
        </section>
      </div>
    </div>
  )
}

export default OverView;