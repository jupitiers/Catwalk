import React, {useEffect, useContext, useState} from 'react';
import QAList from './QAList.jsx';
import styles from './qa.module.css';
import $ from 'jquery';

//sample data
import qaSampleData from './qaSampleData.js';
import { APIContext } from '../../state/contexts/APIContext';
import { QuestionContext } from '../../state/contexts/QuestionsContext';

const QASection = () => {
  const { getQuestionsByProductId } = useContext(APIContext);
  const { questions } = useContext(QuestionContext);

  const[clicked, setClicked] = useState(false);
  const[searchQuery, setSearchQuery] = useState(' ');
  const[searching, setSearching] = useState(false);


  useEffect(() => {
    getQuestionsByProductId();
  }, []);

  var questionList = questions.slice();

  questionList.sort((obj1, obj2) => obj2.helpfulness - obj1.helpfulness);


  if (searchQuery.length > 2) {
    var searchedQuestions = [];
    for (var i = 0; i < questionList.length; i++) {
      if (questionList[i].question_body.indexOf(searchQuery) !== undefined) {
        searchedQuestions.push(questionList[i]);
      }
    }
    var shortenedSearchedQuestions = searchedQuestions.slice(0, 4);
    if (clicked) {
      usedQuestions = shortenedSearchQuestions;
    } else {
      usedQuestions = searchedQuestions;
    }
  } else {
    var initialQuestions = questionList.slice(0, 4);
    var usedQuestions;
    if (clicked) {
      usedQuestions = questionList;
    } else {
      usedQuestions = initialQuestions;
    }
  }

  var searchChange = function (query) {
    setSearchQuery(query);
    if (searchQuery.length >= 2) {
      setSearching(!searching);
      console.log(searching);
      getQuestionsByProductId();
    }
  }
  //Add a usedQuestions conditional for if the search bar has 3+ characters in it

  return(
    <div className={styles.section}>
      <div className={styles.title}>
        <h2>Questions & Answers</h2>
      </div>
      <form className={styles.searchdiv}>
        <input className={styles.searchbar} id='searchbar' type='text' placeholder='Have a question? Search for answers...' onChange={() => searchChange($('#searchbar').val())}/>
      </form>
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