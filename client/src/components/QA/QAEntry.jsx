import React, {useEffect, useContext, useState} from 'react';
import AnswerList from './AnswerList.jsx';
import lightStyles from './qaLight.module.css';
import AnswerModal from './AnswerModal.jsx';

import { APIContext } from '../../state/contexts/APIContext';

var QA = (props) => {

  const { getAnswersByQuestionId, markQuestionAsHelpful, reportQuestion, trackClick } = useContext(APIContext);


  const[helpful, setHelpful] = useState(false);
  const[reported, setReported] = useState(false);
  const[showModal, setShowModal] = useState(false);

  var closeAnswerModal = function() {
    setShowModal(false);
  }

  var questionHelpfulnessClick = function(questionId, helpful) {
    if (!helpful) {
      markQuestionAsHelpful(questionId);
    }
  }

  // var reportQuestionClick = function(questionId, reported) {
  //   if (!reported) {
  //     reportQuestion(questionId);
  //   }
  // }

  return (
    <div className={lightStyles.feedentry}>
      <div className={lightStyles.qasection}>
        <div className={lightStyles.qatitle}>
          <h4>Q: </h4>
        </div>
        <div className={lightStyles.qacontent}>
          <h4>{props.question}</h4>
        </div>
        <div className={lightStyles.questionactionsection}>
          <div className={lightStyles.questionactiondiv}>
            Helpful?
          </div>
          <div className={lightStyles.questionactiondiv} onClick={(e) => {questionHelpfulnessClick(props.id, helpful); setHelpful(true);}}>
            {helpful
              ? <span className={lightStyles.questionactionclicked}>Yes </span>
              : <span className={lightStyles.questionaction}>Yes </span>
            } ({props.helpfulness})
          </div>|
          {/* <div className={lightStyles.questionactiondiv} onClick={() => {reportQuestionClick(props.id, reported); setReported(true);}}>
            {reported
              ? <p className={lightStyles.questionactionclicked}>Reported</p>
              : <p className={lightStyles.questionaction}>Report</p>
            }
          </div>| */}
          <div className={lightStyles.questionactiondiv}>
            <p className={lightStyles.questionaction} id='addAnswer' onClick={(e) => {setShowModal(true)}}>Add Answer</p>
          </div>
          <div>
            {showModal
            ? <div className={lightStyles.modal}>
                <span className={lightStyles.modalclose} onClick={(e) => {closeAnswerModal()}}><i className="far fa-times-circle" /></span>
                <AnswerModal id='answerModal' questionId={props.id} question={props.question} productData={props.productData} closeModal={closeAnswerModal}/>
              </div>
            : null
            }
          </div>
        </div>
      </div>
      <div className={lightStyles.qasection}>
        <div className={lightStyles.qatitle}>
          <h4>A: </h4>
        </div>
        <div className={lightStyles.qacontent}></div>
           <AnswerList className='answerList' answers={props.answers} questionId={props.id}/>
      </div>
    </div>
  )
}

export default QA;

