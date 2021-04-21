import React, {useEffect, useContext, useState} from 'react';
import AnswerList from './AnswerList.jsx';
import styles from './qa.module.css';
import AnswerModal from './AnswerModal.jsx';

var QA = (props) => {
  const[helpful, setHelpful] = useState(false);
  const[reported, setReported] = useState(false);
  const[showModal, setShowModal] = useState(false);


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
          <div className={styles.questionactiondiv} onClick={() => {props.helpfulnessClick(props.id, helpful); setHelpful(true);}}>
            {helpful
              ? <span className={styles.questionactionclicked}>Yes </span>
              : <span className={styles.questionaction}>Yes </span>
            } ({props.helpfulness})
          </div>|
          {/* <div className={styles.questionactiondiv} onClick={() => {props.reportClick(props.id, reported); setReported(true);}}>
            {reported
              ? <p className={styles.questionactionclicked}>Reported</p>
              : <p className={styles.questionaction}>Report</p>
            }
          </div>| */}
          <div className={styles.questionactiondiv}>
            <p className={styles.questionaction} onClick={() => {setShowModal(true)}}>Add Answer</p>
          </div>
          <div>
            {showModal
            ? <div className={styles.modal}>
                <span className={styles.modalclose} onClick={() => {setShowModal(false)}}>x</span>
                <AnswerModal questionId={props.id} question={props.question} productData={props.productData}/>
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
           <AnswerList answers={props.answers} questionId={props.id}/>
      </div>
    </div>
  )
}

export default QA;

