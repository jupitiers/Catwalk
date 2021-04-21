import React, { useState, useContext } from 'react';
import styles from './reviewImages.module.css';
import { ReviewContext } from '../../../state/contexts/ReviewsContext';

const ReviewImages = ({ images }) => {
  const {
    display, selectedImage, openOverlay, closeOverlay,
  } = useContext(ReviewContext);
  const showHideClassName = display ? styles.show : styles.hide;
  return (
    <>
      <p>
        <b>Reviewer Images:</b>
      </p>
      <div
        onClick={closeOverlay}
        style={display ? { display: 'block' } : { display: 'none' }}
        className={showHideClassName}
      >
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${selectedImage})` }}
        />
      </div>
      <div className={styles.imagesContainer}>
        {images.map((image) => (
          <div
            onClick={() => openOverlay(image.url)}
            key={image.id}
            className={styles.imageWrapper}
            style={{ backgroundImage: `url(${image.url})` }}
          />
        ))}
      </div>
    </>
  );
};

export default ReviewImages;
