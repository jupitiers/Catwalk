import React, {useEffect, useContext} from 'react';
import QAEntry from './QAEntry.jsx';
import moment from 'moment';



var QAList = (props) => {
  return (
    <div>
      {props.data.map(entry =>
      <QAEntry key={entry.question_id} id={entry.question_id} question={entry.question_body} date={moment(entry.question_date).format('MMMM Do YYYY')} author={entry.asker_name} helpfulness={entry.question_helpfulness} reported={entry.reported} answers={entry.answers}/>
      )}
    </div>
  )
}

export default QAList;