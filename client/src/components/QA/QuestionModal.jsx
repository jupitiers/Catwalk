import React, {useContext, useEffect, useState} from 'react';
import lightStyles from './qaLight.module.css';
import darkStyles from './qaDark.module.css';
import $ from 'jquery';

import { APIContext } from '../../state/contexts/APIContext';


const QuestionModal = (props) => {
  const { getQuestionsByProductId, addQuestion, trackClick, pId } = useContext(APIContext);

  const [questionAuth, setQuestionAuth] = useState(true);
  const [nicknameAuth, setNicknameAuth] = useState(true);
  const [emailAuth, setEmailAuth] = useState(true);
  const [submittable, setSubmittable] = useState(true);

  var questionSubmit = true;
  var nicknameSubmit = true;
  var emailSubmit = true;

  var submit = function(data) {
    if (questionSubmit && nicknameSubmit && emailSubmit) {
      setSubmittable(true);
      addQuestion(data);
      props.closeModal();
    } else {
      setSubmittable(false);
    }
  }

  var checkAuth = function(question, nickname, email) {

    if (question && question.length > 0) {
      setQuestionAuth(true);
      questionSubmit = true;
    } else if (!question || question.length === 0) {
      setQuestionAuth(false);
      questionSubmit = false;
    }

    if (nickname && nickname.length > 0) {
      setNicknameAuth(true);
      nicknameSubmit = true;
    } else if (!nickname || nickname.length === 0) {
      setNicknameAuth(false);
      nicknameSubmit = false;
    }

    if (email && email.indexOf('@') > 0) {
      setEmailAuth(true);
      emailSubmit = true;
    } else if (!email || email.indexOf('@') < 0) {
      setEmailAuth(false);
      emailSubmit = false;
    }

    var questionData = {
      body: question,
      name: nickname,
      email: email,
      product_id: pId //Example, will implement getting pId later
    }

    submit(questionData);
  }

  return(
    <div className={lightStyles.modalcontent}>
      <h2 id='title'>Ask Your Question</h2>
      <h4 id='subtitle'>About the {props.productName}</h4>
      <div>
        <div>
          {submittable
            ? null
            : <p className={lightStyles.submiterror}>You must enter the following: </p>
          }
        </div>
        <div className={lightStyles.modaldiv}>
          {questionAuth
            ? <div>
                <span>Your Question: *</span><br/>
                <textarea id='question' className={lightStyles.modalquestion} maxLength='1000' placeholder='Write your question here (1000 character max)'/>
              </div>
            : <div>
                <span className={lightStyles.modaltitlecheck}>Question: *</span><br/>
                <textarea id='questionCheck' className={lightStyles.modalquestioncheck} maxLength='1000' placeholder='Write your question here (1000 character max)'/>
              </div>
          }
        </div>
        <div className={lightStyles.modaldiv}>
          {nicknameAuth
            ? <div>
                <span>What is your nickname: * </span><br/>
                <input type='text' id='nickname' className={lightStyles.modaluser} maxLength='60' placeholder='Example: jackson11!'/><br/>
                <span>For privacy reasons, do not use your full name or email address</span>
              </div>
            : <div>
                <span className={lightStyles.modaltitlecheck}>Nickname: * </span><br/>
                <input type='text' id='nicknameCheck' className={lightStyles.modalusercheck} maxLength='60' placeholder='Example: jackson11!'/><br/>
                <span>For privacy reasons, do not use your full name or email address</span>
              </div>
          }
        </div>
        <div className={lightStyles.modaldiv}>
          {emailAuth
            ? <div>
                <span>Your email: * </span><br/>
                <input type='text' id='email' className={lightStyles.modaluser} maxLength='60' placeholder='Example: jackson11@gmail.com'/><br/>
                <span>For authentication purposes, you will not be emailed</span>
              </div>
            : <div>
                <span className={lightStyles.modaltitlecheck}>Email: * </span><br/>
                <input type='text' id='emailCheck' className={lightStyles.modalusercheck} maxLength='60' placeholder='Example: jackson11@gmail.com'/><br/>
                <span>For authentication purposes, you will not be emailed</span>
              </div>
          }
        </div>
        <div>
          <button className={lightStyles.questionsubmit} onClick={(e) => {checkAuth($('#question').val(), $('#nickname').val(), $('#email').val())}}>Submit question</button>
        </div>
      </div>
    </div>
  )
};

export default QuestionModal;