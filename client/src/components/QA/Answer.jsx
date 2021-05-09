import React, { useEffect, useContext, useState } from 'react';
import lightStyles from './qaLight.module.css';
import darkStyles from './qaDark.module.css';

import { APIContext } from '../../state/contexts/APIContext';

const Answer = (props) => {
  const { trackClick } = useContext(APIContext);

  const [helpful, setHelpful] = useState(false);
  const [reported, setReported] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState('');
  const [showPhoto, setShowPhoto] = useState(false);

  return (
    <div className={lightStyles.answerentry}>
      <div className={lightStyles.answer}>
        {props.answer}
      </div>
      <div className={lightStyles.answerlogistics}>
        <div className={lightStyles.answerauthor}>
          by
          {' '}
          {props.author.toLowerCase() === 'seller'
            ? <span style={{fontWeight: 'bold'}}>Seller</span>
            : <span>{props.author}</span>
          }
          ,
          {' '}
          {props.date}
        </div>
        |
        <div className={lightStyles.answeractiondiv}>
          Helpful?
        </div>
        <div
          id = 'helpfulButton'
          className={lightStyles.answeractiondiv}
          onClick={(e) => {props.helpfulnessClick(props.id, helpful); setHelpful(true); }}
        >
          {helpful
            ? <span id='helpfulClick' className={lightStyles.answeractionclicked}>Yes </span>
            : <span id='helpful' className={lightStyles.answeraction}>Yes </span>}
          {' '}
          (
          {props.helpfulness}
          )
        </div>
        |
        <div
          id = 'reportButton'
          className={lightStyles.answeractiondiv}
          onClick={(e) => {props.reportClick(props.id, reported); setReported(true); }}
        >
          {reported
            ? <p id='reported' className={lightStyles.answeractionclicked}>Reported</p>
            : <p id='report' className={lightStyles.answeraction}>Report</p>}
        </div>
      </div>
      <div>
        {props.photos
          ? <div>
              {props.photos.map((photo, idx) => (
                <div key={idx} className={lightStyles.imageArea}>
                  <img className={lightStyles.answerimage} src={photo} onClick={() => {setSelectedPhoto(photo); setShowPhoto(true)}} />
                </div>
              ))}
            </div>
          : null
        }
        {showPhoto
          ? <div className={lightStyles.modal}>
              <span className={lightStyles.modalclose} onClick={() => {setShowPhoto(false)}}><i className="far fa-times-circle" /></span>
              <div className={lightStyles.modalcontent}>
                <img className={lightStyles.modalphoto} src={selectedPhoto}/>
              </div>
            </div>
          : null
        }
      </div>
    </div>
  );
};

export default Answer;
