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
        <div className={styles.answeractions}>
          Helpful?
        </div>
        <div className={styles.answeractions} onClick={() => {props.helpfulnessClick(props.id, props.questionId)}}>
          Yes ({props.helpfulness})
        </div>|
        <div className={styles.answeractions} onClick={() => setReported(true)}>
          {reported ? 'Reported' : 'Report'}
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