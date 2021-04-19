import React, {useEffect, useContext, useState} from 'react';
import QAList from './QAList.jsx';
import styles from './qa.module.css';

//sample data
import qaSampleData from './qaSampleData.js';
import { APIContext } from '../../state/contexts/APIContext';
import { QuestionContext } from '../../state/contexts/QuestionsContext';

const QASection = () => {
  const { getQuestionsByProductId } = useContext(APIContext);
  const { questions } = useContext(QuestionContext);

  const[clicked, setClicked] = useState(false);

  useEffect(() => {
    getQuestionsByProductId();
  }, []);

  var questionList = questions.slice();

  questionList.sort((obj1, obj2) => obj2.helpfulness - obj1.helpfulness);

  var initialQuestions = questionList.slice(0, 4);
  var usedQuestions;
  if (clicked) {
    usedQuestions = questionList;
  } else {
    usedQuestions = initialQuestions;
  }

  return(
    <div className={styles.section}>
      <div className={styles.title}>
        <h2>Questions & Answers</h2>
      </div>
      <div className={styles.searchdiv}>
        <input className={styles.searchbar} type='text' placeholder='Have a question? Search for answers...'/>
      </div>
      <div className={styles.feed}>
        <QAList data={usedQuestions}/>
      </div>
      <div className='QA-button'>
      {clicked
        ? <button className={styles.button} onClick={() => setClicked(false)}>Fewer Answered Questions</button>
        : <button className={styles.button} onClick={() => setClicked(true)}>More Answered Questions</button>
      }
        <button className={styles.button}>Add a Question +</button>
      </div>
    </div>
  )
}

export default QASection;