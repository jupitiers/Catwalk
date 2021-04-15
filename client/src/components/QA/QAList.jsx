import React, {useEffect, useContext} from 'react';
import QAEntry from './QAEntry.jsx';

var QAList = (props) => (
    <div>
      <QAEntry question={props.question}/>
    </div>
)

export default QAList;