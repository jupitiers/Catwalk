import React, {useEffect, useContext, useState} from 'react';
import QAList from './QAList.jsx';
import styles from './qa.module.css';
import $ from 'jquery';
import QuestionModal from './QuestionModal.jsx';

//sample data
import qaSampleData from './qaSampleData.js';
import { APIContext } from '../../state/contexts/APIContext';
import { QuestionContext } from '../../state/contexts/QuestionsContext';
import { ProductContext } from '../../state/contexts/ProductContext';

const QASection = () => {
  const { getQuestionsByProductId, getProductById } = useContext(APIContext);
  const { questions } = useContext(QuestionContext);
  const { selectedProduct, setSelectedProduct } = useContext(ProductContext);


  const[clicked, setClicked] = useState(false);
  const[noResults, setNoResults] = useState(false);
  const[searchResults, setSearchResults] = useState([]);
  const[showModal, setShowModal] = useState(false);


  useEffect(() => {
    getQuestionsByProductId();
    getProductById();
  }, []);

  var questionList = questions.slice();
  var enoughQuestions = (questionList.length > 2);
  questionList.sort((obj1, obj2) => obj2.helpfulness - obj1.helpfulness);

  var closeQuestionModal = function() {
    setShowModal(false);
  }

  var searchFunc = function(query) {
    if (query.length > 2) {
      var searchedQuestions = [];
      for (var i = 0; i < questionList.length; i++) {
        var currentTestBody = questionList[i].question_body.toLowerCase();
        if (currentTestBody.indexOf(query.toLowerCase()) >= 0) {
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

  var initialQuestions = questionList.slice(0, 2);
  var usedQuestions;
  if (searchResults.length > 0) {
    var searchedQuestionsList = searchResults.slice();
    var shortenedSearchedQuestions = searchedQuestionsList.slice(0, 2);
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
        <h2>QUESTIONS & ANSWERS</h2>
      </div>
      <form className={styles.searchdiv}>
        <input className={styles.searchbar} id='searchbar' type='text' placeholder='Have a question? Search for answers...' onChange={() => {searchFunc($('#searchbar').val());}}/>
      </form>
      <div className={styles.feed}>
        {noResults
          ? <p id='noResults'>Sorry, no related questions could be found...</p>
          : <QAList id='QAlist' questionData={usedQuestions} productData={selectedProduct}/>
        }
      </div>
      <div className='QA-button'>
        {enoughQuestions
          ? <span>
              {clicked
                ? <button id='fewerQuestions' className={styles.button} onClick={() => setClicked(false)}>Fewer Answered Questions</button>
                : <button id='moreQuestions' className={styles.button} onClick={() => setClicked(true)}>More Answered Questions</button>
                }
            </span>
          : null
        }
        <button id='addQuestion' className={styles.button} onClick={() => {setShowModal(true)}}>Add a Question +</button>
      </div>
      <div id='questionModalDiv'>
        {showModal
          ? <div className={styles.modal}>
              <span className={styles.modalclose} onClick={() => {closeQuestionModal()}}><i className="far fa-times-circle" /></span>
              <QuestionModal id='questionModal' productName={selectedProduct.name} closeModal={closeQuestionModal}/>
            </div>
          : null
        }
      </div>
    </div>
  )
}

export default QASection;