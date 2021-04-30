import React, {useEffect, useContext, useState} from 'react';
import QAList from './QAList.jsx';
import lightStyles from './qaLight.module.css';
import darkStyles from './qaDark.module.css';
import $ from 'jquery';
import QuestionModal from './QuestionModal.jsx';

import { APIContext } from '../../state/contexts/APIContext';
import { QuestionContext } from '../../state/contexts/QuestionsContext';
import { ProductContext } from '../../state/contexts/ProductContext';

const QASection = () => {
  const { getQuestionsByProductId, getProductById, trackClick, productId } = useContext(APIContext);
  const { questions } = useContext(QuestionContext);
  const { selectedProduct } = useContext(ProductContext);

  const[clicked, setClicked] = useState(false);
  const[noResults, setNoResults] = useState(false);
  const[searchResults, setSearchResults] = useState([]);
  const[showModal, setShowModal] = useState(false);

  useEffect(() => {
    getQuestionsByProductId();
    getProductById();
  }, [productId]);

  var questionList = questions.slice();
  var enoughQuestions = (questionList.length > 2);
  questionList.sort((obj1, obj2) => obj2.helpfulness - obj1.helpfulness);
  var initialQuestions = questionList.slice(0, 2);
  var usedQuestions;

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
        enoughQuestions = false;
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
    var shortenedSearchedQuestions = searchedQuestionsList.slice(0, 2);
    if (searchedQuestionsList.length > 2) {
      enoughQuestions = true;
    } else {
      enoughQuestions = false;
    }
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

  var closeQuestionModal = function() {
    setShowModal(false);
  }

  return(
    <div className={lightStyles.section}>
      <div className={lightStyles.title}>
        <h2>QUESTIONS & ANSWERS</h2>
      </div>
      <form className={lightStyles.searchdiv}>
        <input className={lightStyles.searchbar} id='searchbar' type='text' placeholder='Have a question? Search for answers...' onChange={() => {searchFunc($('#searchbar').val());}}/>
      </form>
      <div className={lightStyles.feed}>
        {noResults
          ? <p id='noResults'>Sorry, no related questions could be found...</p>
          : <QAList id='QAlist' questionData={usedQuestions} productData={selectedProduct}/>
        }
      </div>
      <div>
        <span id='moreQuestionsButton'>
          {enoughQuestions && !noResults
            ? <span>
                {clicked
                  ? <button id='fewerQuestions' className={lightStyles.button} onClick={(e) => {setClicked(false)}}>Fewer Answered Questions</button>
                  : <button id='moreQuestions' className={lightStyles.button} onClick={(e) => {setClicked(true)}}>More Answered Questions</button>
                  }
              </span>
            : null
          }
        </span>
        <span>
          <button id='addQuestion' className={lightStyles.button} onClick={(e) => {setShowModal(true)}}>Add a Question +</button>
        </span>
      </div>
      <div id='questionModalDiv'>
        {showModal
          ? <div className={lightStyles.modal}>
              <span className={lightStyles.modalclose} onClick={(e) => {closeQuestionModal()}}><i className="far fa-times-circle" /></span>
              <QuestionModal id='questionModal' productName={selectedProduct.name} closeModal={closeQuestionModal}/>
            </div>
          : null
        }
      </div>
    </div>
  )
}

export default QASection;