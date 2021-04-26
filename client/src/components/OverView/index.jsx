import React from 'react';

// import Components
import ImageGallery from '../ImageGallery/index.jsx';
import ProductForm from '../ProductForm/index.jsx';

// import styles
import styles from './overview.module.css';

const OverView = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.messageP}><i>site-wide announcement message! </i>- sale / discount <b>offer</b> - <u>new product hightlight</u></p>
      <div className={styles.secWrapper}>
        <section className={styles.secOne}>
          <ImageGallery />
        </section>
        <section className={styles.secTwo}>
          <ProductForm />
        </section>
      </div>
    </div>
  )
}

export default OverView;