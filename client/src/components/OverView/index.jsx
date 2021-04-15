import React from 'react';

import ImageGallery from '../ImageGallery/index.jsx';
import Product from '../Product/index.jsx';

import styles from './overview.module.css';

const OverView = () => {
  return (
    <div className='wrapper'>
      <section className={styles.secOne}>
        <ImageGallery />
      </section>
      <section className={styles.secTwo}>
        <Product />
      </section>
    </div>
  )
}

export default OverView;