import React, { useContext } from 'react';
import styles from './createReview.module.css';
import { ReviewContext } from '../../../state/contexts/ReviewsContext';
import { getCharacteristicsArray } from '../../../helpers/ratingsHelpers';

export function CharacteristicsInputs() {
  const { newReview, changeCharacteristic, metaData } = useContext(ReviewContext);
  const characteristics = getCharacteristicsArray(metaData.characteristics);
  const descriptions = getCharacteristicsArray(metaData.characteristics);

  return (
    <div className={styles.characteristics}>
      <h4>Characteristics</h4>
      <div className={styles.charTypes}>
        {characteristics.length > 0 && characteristics.map((ch, idx) => {
          const [currentDesc] = descriptions.filter((d) => d.id === ch.id);
          return (
            <div key={idx}>
              <div className={styles.charHeading} key={idx}>
                <p>
                  {ch.name}
                  :
                </p>
                {' '}
                <span style={{
                  marginLeft: '1em',
                  fontWeight: 'bold',
                  color: '#641373',
                }}
                >
                  {newReview.characteristics[ch.id]
                  && currentDesc.descriptions[newReview.characteristics[ch.id]]}
                </span>
              </div>
              <div className={styles.charChoices}>
                <div className={styles.radioChoice}>
                  <label htmlFor={`${ch.name}1`}>1</label>
                  <input onChange={changeCharacteristic} type="radio" name={ch.id} id={`${ch.name}1`} value="1" />
                </div>
                <div className={styles.radioChoice}>
                  <label htmlFor={`${ch.name}2`}>2</label>
                  <input onChange={changeCharacteristic} type="radio" name={ch.id} id={`${ch.name}2`} value="2" />
                </div>
                <div className={styles.radioChoice}>
                  <label htmlFor={`${ch.name}3`}>3</label>
                  <input onChange={changeCharacteristic} type="radio" name={ch.id} id={`${ch.name}3`} value="3" />
                </div>
                <div className={styles.radioChoice}>
                  <label htmlFor={`${ch.name}4`}>4</label>
                  <input onChange={changeCharacteristic} type="radio" name={ch.id} id={`${ch.name}4`} value="4" />
                </div>
                <div className={styles.radioChoice}>
                  <label htmlFor={`${ch.name}5`}>5</label>
                  <input onChange={changeCharacteristic} type="radio" name={ch.id} id={`${ch.name}5`} value="5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
