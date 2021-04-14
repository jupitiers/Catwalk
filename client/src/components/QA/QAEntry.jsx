import React, {useEffect, useContext} from 'react';
import styles from './qa.module.css';

var QA = () => (
  <div>
    <div>
      Q: This is where the question would go
    </div>
    <div>
      A: This is where the most helpful answers would go
    </div>
    <div>
      This is where related images would go
    </div>
    <button className={styles.feedbutton}>Load more answers</button>
  </div>
)

export default QA;
