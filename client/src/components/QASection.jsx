import React, {useEffect, useContext} from 'react';
import QAList from './QAList.jsx';

const QASection = () => {
  return(
    <div className='QA-section'>
      <div className='QA-title'>
        <h2>Questions & Answers</h2>
      </div>
      <div className='QA-search'>
        <input type='text' placeholder='Have a question? Search for answers...'/>
      </div>
      <div className='QA-feed'>
        <span>Feed</span>
        <QAList/>
      </div>
      <div className='QA-button'>
        <button>More Answered Questions</button>
        <button>Add a Question +</button>
      </div>
    </div>
  )
}

export default QASection;