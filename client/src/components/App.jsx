import React, {useEffect, useContext} from 'react';
import '../index.css'
import styles from './app.module.css';
// context imports
import {ProductContext} from '../state/contexts/ProductContext';

import QASection from './QASection.jsx';

const App = () => {
  const {
    sampleProduct,
    setSampleProduct,
    productList,
    setProductList,
    someFunc,
    } = useContext(ProductContext)

  useEffect(() => {
    console.log({sampleProduct})
    someFunc();
  }, [])

    return (
      <div className={styles.appContainer}>
        <h1>App.js is connected</h1>
        <QASection/>
      </div>

    )
}

export default App;