import React, { useContext } from 'react';
import styles from './ratingsFactors.module.css';
import { ReviewContext } from '../../../state/contexts/ReviewsContext';
import { getCharacteristicsArray } from '../../../helpers/ratingsHelpers';

const RatingsFactors = () => {
  const { metaData } = useContext(ReviewContext);
  const characteristics = getCharacteristicsArray(metaData.characteristics);

  return (
    <div className={styles.factorsContainer}>
      {characteristics.map((char, idx) => (
        <div key={idx} className={styles.factorItem}>
          <p><b>{char.name}</b></p>
          <input type="range" className={styles.range} disabled={true} value={char.value.toString()} min="0" max="50" />
          <div className={styles.rangeDescriptions}>
            <p>{char.descriptions['1']}</p>
            <p>{char.descriptions['3']}</p>
            <p>{char.descriptions['5']}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default RatingsFactors;
