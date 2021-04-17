import React from 'react';
import styles from './ratingsFactors.module.css';

const RatingsFactors = () => (
  <div className={styles.factorsContainer}>
    <div className={styles.factorItem}>
      <p><b>Size</b></p>
      <input type="range" className={styles.range} disabled="true" value="65" />
      <div className={styles.rangeDescriptions}>
        <p>Too small</p>
        <p>Perfect</p>
        <p>Too large</p>
      </div>
    </div>
    <div className={styles.factorItem}>
      <p><b>Width</b></p>
      <input type="range" className={styles.range} disabled="true" value="50" />
      <div className={styles.rangeDescriptions}>
        <p>Too narrow</p>
        <p>Perfect</p>
        <p>Too wide</p>
      </div>
    </div>
    <div className={styles.factorItem}>
      <p><b>Comfort</b></p>
      <input type="range" className={styles.range} disabled="true" value="70" />
      <div className={styles.rangeDescriptions}>
        <p>Uncomfortable</p>
        <p>OK</p>
        <p>Perfect</p>
      </div>
    </div>
    <div className={styles.factorItem}>
      <p><b>Quality</b></p>
      <input type="range" className={styles.range} disabled="true" value="60" />
      <div className={styles.rangeDescriptions}>
        <p>Poor</p>
        <p>What I expected</p>
        <p>Perfect</p>
      </div>
    </div>
    <div className={styles.factorItem}>
      <p><b>Length</b></p>
      <input type="range" className={styles.range} disabled="true" value="40" />
      <div className={styles.rangeDescriptions}>
        <p>Runs short</p>
        <p>Perfect</p>
        <p>Runs long</p>
      </div>
    </div>
    <div className={styles.factorItem}>
      <p><b>Fit</b></p>
      <input type="range" className={styles.range} disabled="true" value="55" />
      <div className={styles.rangeDescriptions}>
        <p>Runs tight</p>
        <p>Perfect</p>
        <p>Runs long</p>
      </div>
    </div>
  </div>
);

export default RatingsFactors;
