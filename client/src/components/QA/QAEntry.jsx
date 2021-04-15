import React, {useEffect, useContext} from 'react';
import Answer from './QAEntryAnswers.jsx';
import styles from './qa.module.css';

var QA = (props) => {
  var answers = Object.entries(props.answers);
  var initialAnswers = answers.slice(0, 2);
  var usedAnswers;
  console.log(answers);
  console.log(initialAnswers);
  var enoughAnswers = (answers.length > 2);
  var clicked = false;
  var clickAnswers = function() {
    clicked = !clicked;
    console.log(clicked);
  }
  if (clicked) {
    usedAnswers = answers;
  } else {
    usedAnswers = initialAnswers;
  }
  return (
    <div>
      <div>
        <h4>Q: {props.question}</h4>
      </div>
      <div>
        {usedAnswers.map(entry =>
          <Answer key={entry[1].id} answer={entry[1].body} date={entry[1].date} author={entry[1].answerer_name} helpfulness={entry[1].helpfulness} photos={entry[1].photos}/>
          )}
      </div>
      {enoughAnswers
        ? <button className={styles.feedbutton} onClick={() => {clickAnswers()}}>Load more answers</button>
        : <div/>
      }
    </div>
  )
}

export default QA;

//Initial state: Only display 2 answers
//Clicked state: Display all answers


