import React, { useEffect, useContext } from 'react';
// import '../index.css'
import styles from './app.module.css';
// context imports
import { ProductContext } from '../state/contexts/ProductContext';

// import components
import Header from './Header/index';
import OverView from './OverView/index';
import QASection from './QA/index';
import RatingsAndReviews from './Reviews _and_ratings/RatingsAndReviews';

const App = () => {
  const {
    sampleProduct,
    setSampleProduct,
    productList,
    setProductList,
    someFunc,
  } = useContext(ProductContext);

  useEffect(() => {
    console.log({ sampleProduct });
    someFunc();
  }, []);

  return (
    <div className={styles.appContainer}>
      <Header />
      <OverView />
      <div className={styles.componentContainer}>
        <QASection />
        <RatingsAndReviews />
      </div>
    </div>

  );
};

export default App;
