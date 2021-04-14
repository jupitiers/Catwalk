import React, {useEffect, useContext} from 'react';
import '../index.css'
import styles from './app.module.css';
// context imports
import {ProductContext} from '../state/contexts/ProductContext';

<<<<<<< HEAD
import QASection from './QASection.jsx';
=======

// import components
import Header from './Header/index.jsx'
>>>>>>> 963e1d05720d3a333d79aead2eeb418cb570162f

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
        <Header />
        <h1>App.js is connected</h1>
        <QASection/>
      </div>

    )
}

export default App;