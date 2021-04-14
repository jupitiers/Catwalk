import React, {useEffect, useContext} from 'react';
import '../index.css'
import styles from './app.module.css';
// context imports
import {ProductContext} from '../state/contexts/ProductContext';


// import components
import Header from './Header/index.jsx'
import RatingsAndReviews from './Reviews/RatingsAndReviews.jsx';


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
        <div className={styles.componentContainer}>
        <RatingsAndReviews/>
        </div>
      </div>
    )
}

export default App;