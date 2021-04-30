import React, { useContext, useEffect, useState } from 'react';
import $ from 'jquery';
import lightStyles from './qaLight.module.css';
import darkStyles from './qaDark.module.css';

import { APIContext } from '../../state/contexts/APIContext';
import { ReviewContext } from '../../state/contexts/ReviewsContext';
import { REACT_APP_CLOUDINARY_URL, REACT_APP_CLOUDINARY_PRESET } from '../../config/config';

const AnswerModal = (props) => {
  const { getQuestionsByProductId, addAnswer, trackClick } = useContext(APIContext);

  const [answerAuth, setAnswerAuth] = useState(true);
  const [nicknameAuth, setNicknameAuth] = useState(true);
  const [emailAuth, setEmailAuth] = useState(true);
  const [submittable, setSubmittable] = useState(true);
  const [photos, setPhotos] = useState([]);

  let answerSubmit = true;
  let nicknameSubmit = true;
  let emailSubmit = true;

  const addPhoto = function (imageUrl) {
    const currentPhotos = photos.slice();
    if (currentPhotos.length < 5 && imageUrl) {
      currentPhotos.push(imageUrl);
      setPhotos(currentPhotos);
    } else if (currentPhotos.length === 5) {
      console.log('too many photos');
    }
  };

  const uploadPhoto = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', REACT_APP_CLOUDINARY_PRESET);
    formData.append('folder', 'catwalk');

    try {
      const res = await fetch(REACT_APP_CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      });
      const file = await res.json();
      if (res) {
        if (photos.length < 5 && file.url) {
          console.log(file);
          addPhoto(file.url);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const submit = function (questionId, data) {
    if (answerSubmit && nicknameSubmit && emailSubmit) {
      setSubmittable(true);
      addAnswer(questionId, data);
      props.closeModal();
    } else {
      setSubmittable(false);
    }
  };

  const checkAuth = function (answer, nickname, email) {
    if (answer && answer.length > 0) {
      setAnswerAuth(true);
      answerSubmit = true;
    } else if (!answer || answer.length === 0) {
      setAnswerAuth(false);
      answerSubmit = false;
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

    const answerData = {
      body: answer,
      name: nickname,
      email,
      photos,
    };

    submit(props.questionId, answerData);
  };

  return (
    <div className={lightStyles.modalcontent}>
      <h2 id="title">Submit Your Answer</h2>
      <h4 id="subtitle">
        {props.productData.name}
        :
        {' '}
        {props.question}
      </h4>
      <div>
        <div>
          {submittable
            ? null
            : <p className={lightStyles.submiterror}>You must enter the following: </p>}
        </div>
        <div className={lightStyles.modaldiv}>
          {answerAuth
            ? (
              <div>
                <span>Your Answer: *</span>
                <br />
                <textarea id="answer" className={lightStyles.modalquestion} maxLength="1000" placeholder="Write your answer here (1000 character max)" />
              </div>
            )
            : (
              <div>
                <span className={lightStyles.modaltitlecheck}>Question: *</span>
                <br />
                <textarea id="answerCheck" className={lightStyles.modalquestioncheck} maxLength="1000" placeholder="Write your answer here (1000 character max)" />
              </div>
            )}
        </div>
        <div className={lightStyles.modaldiv}>
          {nicknameAuth
            ? (
              <div>
                <span>What is your nickname: * </span>
                <br />
                <input type="text" id="nickname" className={lightStyles.modaluser} maxLength="60" placeholder="Example: jack543!" />
                <br />
                <span>For privacy reasons, do not use your full name or email address</span>
              </div>
            )
            : (
              <div>
                <span className={lightStyles.modaltitlecheck}>Nickname: * </span>
                <br />
                <input type="text" id="nicknameCheck" className={lightStyles.modalusercheck} maxLength="60" placeholder="Example: jack543!" />
                <br />
                <span>For privacy reasons, do not use your full name or email address</span>
              </div>
            )}
        </div>
        <div className={lightStyles.modaldiv}>
          {emailAuth
            ? (
              <div>
                <span>Your email: * </span>
                <br />
                <input type="text" id="email" className={lightStyles.modaluser} maxLength="60" placeholder="Example: jack@email.com" />
                <br />
                <span>For authentication purposes, you will not be emailed</span>
              </div>
            )
            : (
              <div>
                <span className={lightStyles.modaltitlecheck}>Email: * </span>
                <br />
                <input type="text" id="emailCheck" className={lightStyles.modalusercheck} maxLength="60" placeholder="Example: jack@email.com" />
                <br />
                <span>For authentication purposes, you will not be emailed</span>
              </div>
            )}
        </div>
        <div className={lightStyles.modaldiv}>
          <div>
            <span>Upload your photos: </span>
            <br />
            <input type="text" id="photoUrl" className={lightStyles.modalphotos} placeholder="Place your photo URL here" />
            {photos.length < 5
              ? <button className={lightStyles.addphoto} onClick={() => { addPhoto($('#photoUrl').val()); }}>Add photo</button>
              : <span>Max photos added</span>}
            {' '}
            <br />
            {photos.length < 5
              ? (
                <label className={lightStyles.uploadphoto}>
                  Upload a photo
                  <input type="file" id="photoUpload" placeholder="Upload a photo" onChange={uploadPhoto} />
                </label>
              )
              : <span>Max photos added</span>}
            <div>
              {photos.map((url) => (
                <div className={lightStyles.imageArea}>
                  <img className={lightStyles.answerimage} key={url} src={url} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <button id="answersubmit" className={lightStyles.questionsubmit} onClick={() => { checkAuth($('#answer').val(), $('#nickname').val(), $('#email').val()); }}>Submit answer</button>
        </div>
      </div>
    </div>
  );
};

export default AnswerModal;
