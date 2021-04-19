import React, {useEffect, useContext, useState} from 'react';
import AnswerList from './AnswerList.jsx'
import styles from './qa.module.css';

var QA = (props) => {
  return (
    <div>
      <div className={styles.qasection}>
        <div className={styles.qatitle}>
          <h4>Q: </h4>
        </div>
        <div className={styles.qacontent}>
          <h4>{props.question}</h4>
        </div>
      </div>
      <div className={styles.qasection}>
        <div className={styles.qatitle}>
          <h4>A: </h4>
        </div>
        <div className={styles.qacontent}></div>
           <AnswerList answers={props.answers} questionId={props.id}/>
      </div>
    </div>
  )
}

export default QA;

