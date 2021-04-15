import React, {useEffect, useContext} from 'react';
import styles from './qa.module.css';

var Answer = (props) => {
  console.log(props);
  return(
    <div className={styles.answerentry}>
      <div className={styles.answer}>
        A: {props.answer}
      </div>
      <div className={styles.answerlogistics}>
        <div className={styles.answerauthor}>
          by {props.author}, {props.date}
        </div>|
        <div className={styles.answeractions}>
          Helpful?
        </div>
        <div className={styles.answeractions}>
          Yes ({props.helpfulness})
        </div>|
        <div className={styles.answeractions}>
          Report
        </div>
      </div>
      <div>
        This is where related images would go {props.photos}
      </div>
    </div>
  )
}

export default Answer;