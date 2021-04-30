import React, { useContext } from 'react';
import styles from './createReview.module.css';
import { ReviewContext } from '../../../state/contexts/ReviewsContext';

export function FileUpload() {
  const { handleImageUpload, newReview } = useContext(ReviewContext);
  return (
    <div className={styles.upload}>
      {newReview.photos.length < 5 && (
      <label htmlFor="upload">
        <p>Upload Images</p>
        <span>Max 5</span>
        <input type="file" id="upload" onChange={handleImageUpload} />
      </label>
      )}
      <div className={styles.images}>
        {newReview.photos.length > 0 && newReview.photos.map((photo, idx) => (
          <div
            key={idx}
            className={styles.thumbnail}
            style={{
              backgroundImage: `url(${photo})`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
