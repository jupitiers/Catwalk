import React, {useEffect, useContext} from 'react';
import QAEntry from './QAEntry.jsx';

import { APIContext } from '../../state/contexts/APIContext';
import { AnswerContext } from '../../state/contexts/AnswersContext';

var QAList = (props) => {
  const { getAnswersByQuestionId } = useContext(APIContext);
  const { answers, setAnswers } = useContext(AnswerContext);

  return (
    <div>
      {props.data.map(entry =>
      <QAEntry key={entry.question_id} id={entry.question_id} question={entry.question_body} date={entry.question_date} author={entry.asker_name} helpfulness={entry.question_helpfulness} reported={entry.reported}/>
      )}
    </div>
  )
}

export default QAList;