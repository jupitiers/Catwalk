import React, {useEffect, useContext} from 'react';
import styles from './qa.module.css';

var Answer = (props) => (
  <div className={styles.answerentry}>
    <div className={styles.answer}>
      A: {props.answer}
    </div>
    <div className={styles.answerlogistics}>
      <div className={styles.answerauthor}>
        by User, date
      </div>
      <div className={styles.answeractions}>
        Helpful? Yes
      </div> |
      <div className={styles.answeractions}>
        Report
      </div>
    </div>
    <div>
      This is where related images would go
    </div>
  </div>
)

export default Answer;