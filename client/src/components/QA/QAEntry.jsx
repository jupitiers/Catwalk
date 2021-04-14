import React, {useEffect, useContext} from 'react';
import Answer from './QAEntryAnswers.jsx';
import styles from './qa.module.css';

var QA = (props) => (
  <div>
    <div>
      Q: {props.question}
    </div>
    <div>
      {/* <Answer answer={'Answer 1'}/>
      <Answer answer={'Answer 2'}/> */}
    </div>
    <div>
      This is where related images would go
    </div>
    <button className={styles.feedbutton}>Load more answers</button>
  </div>
)

export default QA;
