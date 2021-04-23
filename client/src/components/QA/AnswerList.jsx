import React, {useEffect, useContext, useState} from 'react';
import Answer from './Answer.jsx';
import lightStyles from './qaLight.module.css';
import moment from 'moment';

import { APIContext } from '../../state/contexts/APIContext';
import { AnswerContext } from '../../state/contexts/AnswersContext';

var AnswerList = (props) => {
  const { getAnswersByQuestionId, markAnswerAsHelpful, reportAnswer, trackClick } = useContext(APIContext);
  const { answers, setAnswers } = useContext(AnswerContext);

  const[clicked, setClicked] = useState(false);
  const[helpfulClicked, setHelpfulClicked] = useState({clickCount: 0});

  var answerList = [];
  for (var key in props.answers) {
    answerList.push(props.answers[key]);
  }

  answerList.sort((obj1, obj2) => obj2.helpfulness - obj1.helpfulness);

  var initialAnswers = answerList.slice(0, 2);
  var allAnswers = answerList.slice();

  var enoughAnswers = (answerList.length > 2);
  var usedAnswers;
  if (clicked) {
    usedAnswers = allAnswers;
  } else {
    usedAnswers = initialAnswers;
  }

  var answerHelpfulnessClick = function(answerId, helpful) {
    if (!helpful) {
      markAnswerAsHelpful(answerId);
    }
  }

  var reportAnswerClick = function(answerId, reported) {
    if (!reported) {
      reportAnswer(answerId);
    }
  }

  return (
    <div>
      <div>
        {usedAnswers.map(entry =>
          <Answer className='answer' key={entry.id} id={entry.id} answer={entry.body} date={moment(entry.date).format('MMMM Do YYYY')} author={entry.answerer_name} helpfulness={entry.helpfulness} photos={entry.photos} questionId={props.questionId} helpfulnessClick={answerHelpfulnessClick} reportClick={reportAnswerClick}/>
          )}
      </div>
      {enoughAnswers ?
        clicked
          ? <button id='collapseAnswers' className={lightStyles.feedbutton} onClick={(e) => {setClicked(false)}}>Collapse answers</button>
          : <button id='moreAnswers' className={lightStyles.feedbutton} onClick={(e) => {setClicked(true)}}>Load more answers</button>
        : <div/>
      }
    </div>
  )


}

export default AnswerList;