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

  var initialQuestions = questionList.slice(0, 4);
  var usedQuestions;
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
          : <QAList questionData={usedQuestions} productData={selectedProduct}/>
        }
      </div>
      <div className='QA-button'>
        {clicked
          ? <button className={styles.button} onClick={() => setClicked(false)}>Fewer Answered Questions</button>
          : <button className={styles.button} onClick={() => setClicked(true)}>More Answered Questions</button>
        }
        <button className={styles.button} onClick={() => {setShowModal(true)}}>Add a Question +</button>
      </div>
      <div>
        {showModal
          ? <div className={styles.modal}>
              <span className={styles.modalclose} onClick={() => {closeQuestionModal()}}>x</span>
              <QuestionModal productName={selectedProduct.name} closeModal={closeQuestionModal}/>
            </div>
          : null
        }
      </div>
    </div>
  )
}

export default QASection;