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
  const[noResults, setNoResults] = useState(false);
  const[searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    getQuestionsByProductId();
  }, []);

  var questionList = questions.slice();

  questionList.sort((obj1, obj2) => obj2.helpfulness - obj1.helpfulness);

  var initialQuestions = questionList.slice(0, 4);
  var usedQuestions;

  var searchFunc = function(query) {
    if (query.length > 2) {
      var searchedQuestions = [];
      for (var i = 0; i < questionList.length; i++) {
        if (questionList[i].question_body.indexOf(query) >= 0) {
          searchedQuestions.push(questionList[i]);
        }
      }
      setSearchResults(searchedQuestions);
      if (searchedQuestions.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    } else {
      setNoResults(false);
      setSearchResults(questionList);
    }
  }


  if (searchResults.length > 0) {
    var searchedQuestionsList = searchResults.slice();
    var shortenedSearchedQuestions = searchedQuestionsList.slice(0, 4);
    if (clicked) {
      usedQuestions = searchedQuestionsList;
    } else {
      usedQuestions = shortenedSearchedQuestions;
    }
  } else { //For initial rendering
    if (clicked) {
      usedQuestions = questionList;
    } else {
      usedQuestions = initialQuestions;
    }
  }


  return(
    <div className={styles.section}>
      <div className={styles.title}>
        <h2>Questions & Answers</h2>
      </div>
      <form className={styles.searchdiv}>
        <input className={styles.searchbar} id='searchbar' type='text' placeholder='Have a question? Search for answers...' onChange={() => {searchFunc($('#searchbar').val());}}/>
      </form>
      <div className={styles.feed}>
        {noResults
          ? <p>Sorry, no related questions could be found...</p>
          : <QAList data={usedQuestions}/>
        }
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