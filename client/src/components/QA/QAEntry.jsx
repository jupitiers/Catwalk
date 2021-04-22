import React, {useEffect, useContext, useState} from 'react';
import AnswerList from './AnswerList.jsx';
import styles from './qa.module.css';
import AnswerModal from './AnswerModal.jsx';

import { APIContext } from '../../state/contexts/APIContext';

var QA = (props) => {

  const { getAnswersByQuestionId, markQuestionAsHelpful, reportQuestion } = useContext(APIContext);


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
    <div className={styles.feedentry}>
      <div className={styles.qasection}>
        <div className={styles.qatitle}>
          <h4>Q: </h4>
        </div>
        <div className={styles.qacontent}>
          <h4>{props.question}</h4>
        </div>
        <div className={styles.questionactionsection}>
          <div className={styles.questionactiondiv}>
            Helpful?
          </div>
          <div className={styles.questionactiondiv} onClick={() => {questionHelpfulnessClick(props.id, helpful); setHelpful(true);}}>
            {helpful
              ? <span className={styles.questionactionclicked}>Yes </span>
              : <span className={styles.questionaction}>Yes </span>
            } ({props.helpfulness})
          </div>|
          {/* <div className={styles.questionactiondiv} onClick={() => {reportQuestionClick(props.id, reported); setReported(true);}}>
            {reported
              ? <p className={styles.questionactionclicked}>Reported</p>
              : <p className={styles.questionaction}>Report</p>
            }
          </div>| */}
          <div className={styles.questionactiondiv}>
            <p className={styles.questionaction} id='addAnswer' onClick={() => {setShowModal(true)}}>Add Answer</p>
          </div>
          <div>
            {showModal
            ? <div className={styles.modal}>
                <span className={styles.modalclose} onClick={() => {closeAnswerModal()}}><i className="far fa-times-circle" /></span>
                <AnswerModal id='answerModal' questionId={props.id} question={props.question} productData={props.productData} closeModal={closeAnswerModal}/>
              </div>
            : null
            }
          </div>
        </div>
      </div>
      <div className={styles.qasection}>
        <div className={styles.qatitle}>
          <h4>A: </h4>
        </div>
        <div className={styles.qacontent}></div>
           <AnswerList className='answerList' answers={props.answers} questionId={props.id}/>
      </div>
    </div>
  )
}

export default QA;

