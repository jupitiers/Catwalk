import React, {useEffect, useContext, useState} from 'react';
import Answer from './QAEntryAnswers.jsx';
import styles from './qa.module.css';

var QA = (props) => {

  const[clicked, setClicked] = useState(false);

  var answers = Object.entries(props.answers);
  var initialAnswers = answers.slice(0, 2);

  var enoughAnswers = (answers.length > 2);
  var usedAnswers;
  if (clicked) {
    usedAnswers = answers;
  } else {
    usedAnswers = initialAnswers;
  }

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
          {usedAnswers.map(entry =>
          <Answer key={entry[1].id} answer={entry[1].body} date={entry[1].date} author={entry[1].answerer_name} helpfulness={entry[1].helpfulness} photos={entry[1].photos}/>
          )}
      </div>
      {enoughAnswers ?
        clicked
          ? <button className={styles.feedbutton} onClick={() => setClicked(false)}>Collapse answers</button>
          : <button className={styles.feedbutton} onClick={() => setClicked(true)}>Load more answers</button>
        : <div/>
      }
    </div>
  )
}

export default QA;

//Initial state: Only display 2 answers
//Clicked state: Display all answers


