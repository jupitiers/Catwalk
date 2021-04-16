import React, { useState } from 'react';
import styles from './reviewImages.module.css';

const ReviewImages = ({ images }) => {
  const [display, setDisplay] = useState('none');
  const [selectedImage, setSelectedImage] = useState('');

  const openOverlay = (imageUrl) => {
    setDisplay('block');
    setSelectedImage(imageUrl);
  };
  const closeOverlay = () => {
    setDisplay('none');
    setSelectedImage('');
  };

  return (
    <>
      <p>Reviewer Images: </p>
      <div
        onClick={closeOverlay}
        style={{ display }}
        className={styles.imageOverlay}
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
