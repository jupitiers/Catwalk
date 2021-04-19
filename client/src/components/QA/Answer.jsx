import React, {useEffect, useContext, useState} from 'react';
import styles from './qa.module.css';

var Answer = (props) => {
  const[helpful, setHelpful] = useState(false);
  const[reported, setReported] = useState(false);

  return(
    <div className={styles.answerentry}>
      <div className={styles.answer}>
        {props.answer}
      </div>
      <div className={styles.answerlogistics}>
        <div className={styles.answerauthor}>
          by {props.author}, {props.date}
        </div>|
        <div className={styles.answeractiondiv}>
          Helpful?
        </div>
        <div className={styles.answeractiondiv} onClick={() => {props.helpfulnessClick(props.id, props.questionId, helpful); setHelpful(true);}}>
          {helpful
            ? <span className={styles.answeractionclicked}>Yes </span>
            : <span className={styles.answeraction}>Yes </span>
          } ({props.helpfulness})
        </div>|
        <div className={styles.answeractiondiv} onClick={() => setReported(true)}>
          {reported
            ? <p className={styles.answeractionclicked}>Reported</p>
            : <p className={styles.answeraction}>Report</p>
          }
        </div>
      </div>
      <div>
        {props.photos.map(photo =>
          <img className={styles.answerimage} src={photo}/>
        )}
      </div>
    </div>
  )
}

export default Answer;