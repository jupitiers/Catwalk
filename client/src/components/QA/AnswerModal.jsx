import React, {useContext, useEffect, useState} from 'react';
import styles from './qa.module.css';
import $ from 'jquery';

import { APIContext } from '../../state/contexts/APIContext';
import { ReviewContext } from '../../state/contexts/ReviewsContext';
import { REACT_APP_CLOUDINARY_URL } from '../../config/config';



const AnswerModal = (props) => {
  const { getQuestionsByProductId, addAnswer } = useContext(APIContext);

  const [questionAuth, setQuestionAuth] = useState(true);
  const [nicknameAuth, setNicknameAuth] = useState(true);
  const [emailAuth, setEmailAuth] = useState(true);
  const [submittable, setSubmittable] = useState(true);
  const [photos, setPhotos] = useState([]);

  var questionSubmit = true;
  var nicknameSubmit = true;
  var emailSubmit = true;

  var addPhoto = function(imageUrl) {
    var currentPhotos = photos.slice();
    if (currentPhotos.length < 5 && imageUrl) {
      currentPhotos.push(imageUrl);
      setPhotos(currentPhotos);
    } else if (currentPhotos.length === 5) {
      console.log('too many photos');
    }
  }

  var uploadPhoto = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', 'jrdii220');
    try {
      const res = await fetch(REACT_APP_CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      });
      const file = await res.json();
      if (res) {
        console.log(res);
        if (photos.length < 5 && file.url) {
          console.log(file);
          addPhoto(file.url);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  var submit = function(questionId, data) {
    if (questionSubmit && nicknameSubmit && emailSubmit) {
      setSubmittable(true);
      console.log('submittable');
      addAnswer(questionId, data);
      props.closeModal();
    } else {
      setSubmittable(false);
      console.log('not');
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

    var answerData = {
      body: question,
      name: nickname,
      email: email,
      photos: photos
    }

    submit(props.questionId, answerData);
  }

  return(
    <div className={styles.modalcontent}>
      <h2 id='title'>Submit Your Answer</h2>
      <h4 id='subtitle'>{props.productData.name}: {props.question}</h4>
      <div>
        <div>
          {submittable
            ? null
            : <p className={styles.submiterror}>You must enter the following: </p>
          }
        </div>
        <div className={styles.modaldiv}>
          {questionAuth
            ? <div>
                <span>Your Answer: *</span><br/>
                <textarea id='answer' className={styles.modalquestion} maxLength='1000' placeholder='Write your answer here (1000 character max)'/>
              </div>
            : <div>
                <span className={styles.modaltitlecheck}>Question: *</span><br/>
                <textarea id='answerCheck' className={styles.modalquestioncheck} maxLength='1000' placeholder='Write your answer here (1000 character max)'/>
              </div>
          }
        </div>
        <div className={styles.modaldiv}>
          {nicknameAuth
            ? <div>
                <span>What is your nickname: * </span><br/>
                <input type='text' id='nickname' className={styles.modaluser} maxLength='60' placeholder='Example: jack543!'/><br/>
                <span>For privacy reasons, do not use your full name or email address</span>
              </div>
            : <div>
                <span className={styles.modaltitlecheck}>Nickname: * </span><br/>
                <input type='text' id='nicknameCheck' className={styles.modalusercheck} maxLength='60' placeholder='Example: jack543!'/><br/>
                <span>For privacy reasons, do not use your full name or email address</span>
              </div>
          }
        </div>
        <div className={styles.modaldiv}>
          {emailAuth
            ? <div>
                <span>Your email: * </span><br/>
                <input type='text' id='email' className={styles.modaluser} maxLength='60' placeholder='Example: jack@email.com'/><br/>
                <span>For authentication purposes, you will not be emailed</span>
              </div>
            : <div>
                <span className={styles.modaltitlecheck}>Email: * </span><br/>
                <input type='text' id='emailCheck' className={styles.modalusercheck} maxLength='60' placeholder='Example: jack@email.com'/><br/>
                <span>For authentication purposes, you will not be emailed</span>
              </div>
          }
        </div>
        <div className={styles.modaldiv}>
          <div>
            <span>Upload your photos: </span><br/>
            <input type='text' id='photoUrl' className={styles.modalphotos} placeholder='Place your photo URL here'/>
            {photos.length < 5
              ? <button className={styles.addphoto} onClick={() => addPhoto($('#photoUrl').val())}>Add photo</button>
              : <span>Max photos added</span>
            } <br/>
            {photos.length < 5
              ? <label className={styles.uploadphoto}>
                  Upload a photo
                  <input type="file" id='photoUpload' placeholder='Upload a photo' onChange={uploadPhoto}/>
                </label>
              // <button className={styles.addphoto} onClick={() => console.log('Adding photo')}>Select photo from your computer</button>
              : <span>Max photos added</span>
            }
            <div>
              {photos.map(url =>
                <img className={styles.answerimage} key={url} src={url}/>
              )}
            </div>
          </div>
        </div>
        <div>
          <button id='answersubmit' className={styles.questionsubmit} onClick={() => {checkAuth($('#question').val(), $('#nickname').val(), $('#email').val())}}>Submit answer</button>
        </div>
      </div>
    </div>
  )
}

export default AnswerModal;