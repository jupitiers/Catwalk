import React, {useEffect, useContext} from 'react';
import QAList from './QAList.jsx';
import styles from './qa.module.css';


const QASection = () => {

  return(
    <div className={styles.section}>
      <div className={styles.title}>
        <span>Questions & Answers</span>
      </div>
      <div className={styles.searchdiv}>
        <input className={styles.searchbar} type='text' placeholder='Have a question? Search for answers...'/>
      </div>
      <div className={styles.feed}>
        <QAList/>
      </div>
      <div className='QA-button'>
        <button className={styles.button}>More Answered Questions</button>
        <button className={styles.button}>Add a Question +</button>
      </div>
    </div>
  )
}

export default QASection;