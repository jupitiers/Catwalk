import React, {useEffect, useContext} from 'react';
import Answer from './QAEntryAnswers.jsx';
import styles from './qa.module.css';

var QA = (props) => {
  var answers = props.answers;
  return (
    <div>
      <div>
        <h4>Q: {props.question}</h4>
      </div>
      <div>
        {Object.entries(answers).map(entry =>
          <Answer key={entry[1].id} answer={entry[1].body} date={entry[1].date} author={entry[1].answerer_name} helpfulness={entry[1].helpfulness} photos={entry[1].photos}/>
          )}
        {/* <Answer answer={'Answer 2'}/> */}
      </div>
      <button className={styles.feedbutton}>Load more answers</button>
    </div>
  )
}

export default QA;
