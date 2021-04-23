import React, { useEffect, useContext, useState } from 'react';
import styles from './qa.module.css';

const Answer = (props) => {
  const [helpful, setHelpful] = useState(false);
  const [reported, setReported] = useState(false);

  return (
    <div className={styles.answerentry}>
      <div className={styles.answer}>
        {props.answer}
      </div>
      <div className={styles.answerlogistics}>
        <div className={styles.answerauthor}>
          by
          {' '}
          {props.author}
          ,
          {' '}
          {props.date}
        </div>
        |
        <div className={styles.answeractiondiv}>
          Helpful?
        </div>
        <div
          id = 'helpfulButton'
          className={styles.answeractiondiv}
          onClick={() => { props.helpfulnessClick(props.id, helpful); setHelpful(true); }}
        >
          {helpful
            ? <span id='helpfulClick' className={styles.answeractionclicked}>Yes </span>
            : <span id='helpful' className={styles.answeraction}>Yes </span>}
          {' '}
          (
          {props.helpfulness}
          )
        </div>
        |
        <div
          id = 'reportButton'
          className={styles.answeractiondiv}
          onClick={() => { props.reportClick(props.id, reported); setReported(true); }}
        >
          {reported
            ? <p id='reported' className={styles.answeractionclicked}>Reported</p>
            : <p id='report' className={styles.answeraction}>Report</p>}
        </div>
      </div>
      <div>
        {props.photos.map((photo, idx) => (
          <img
            key={idx}
            className={styles.answerimage}
            src={photo}
          />
        ))}
      </div>
    </div>
  );
};

export default Answer;
