import React, {useEffect, useContext} from 'react';
import QAEntry from './QAEntry.jsx';
import moment from 'moment';

import { APIContext } from '../../state/contexts/APIContext';
import { QuestionContext } from '../../state/contexts/QuestionsContext';

var QAList = (props) => {
  const { getAnswersByQuestionId, markQuestionAsHelpful, reportQuestion } = useContext(APIContext);

  var questionHelpfulnessClick = function(questionId, helpful) {
    if (!helpful) {
      markQuestionAsHelpful(questionId);
    }
  }

  var reportQuestionClick = function(questionId, reported) {
    if (!reported) {
      reportQuestion(questionId);
    }
  }

  return (
    <div className='QAEntryList'>
      {props.questionData.map(entry =>
      <QAEntry key={entry.question_id} id={entry.question_id} productData={props.productData} question={entry.question_body} date={moment(entry.question_date).format('MMMM Do YYYY')} author={entry.asker_name} helpfulness={entry.question_helpfulness} reported={entry.reported} answers={entry.answers} helpfulnessClick={questionHelpfulnessClick} reportClick={reportQuestionClick}/>
      )}
    </div>
  )
}

export default QAList;