import React, {useEffect, useContext} from 'react';
import styles from './qa.module.css';

var Answer = (props) => {
  <div>
    <div>
      A: {props.answer}
    </div>
    <div>
      by User, date
    </div>
    <div>
      <div>
        Helpful?
      </div>
      <div>
        Report
      </div>
    </div>
  </div>
}

export default Answer;