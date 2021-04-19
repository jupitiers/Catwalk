import React, {useEffect, useContext, useState} from 'react';
import Answer from './Answer.jsx';
import styles from './qa.module.css';

import { APIContext } from '../../state/contexts/APIContext';
import { AnswerContext } from '../../state/contexts/AnswersContext';

var AnswerList = (props) => {
  const { getAnswersByQuestionId, markAnswerAsHelpful } = useContext(APIContext);
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

  var helpfulnessClick = function(answerId, questionId, helpful) {
    if (!helpful) {
      markAnswerAsHelpful(answerId, questionId);
    }
  }

  return (
    <div>
      <div>
        {usedAnswers.map(entry =>
          <Answer key={entry.id} id={entry.id} answer={entry.body} date={entry.date} author={entry.answerer_name} helpfulness={entry.helpfulness} photos={entry.photos} questionId={props.questionId} helpfulnessClick={helpfulnessClick}/>
          )}
      </div>
      {enoughAnswers ?
        clicked
          ? <button className={styles.feedbutton} onClick={() => setClicked(false)}>Collapse answers</button>
          : <button className={styles.feedbutton} onClick={() => setClicked(true)}>Load more answers</button>
        : <div/>
      }
    </div>
  )


}

export default AnswerList;