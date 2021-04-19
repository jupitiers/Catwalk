import React, { useEffect, useContext } from 'react';
// import '../index.css'
import styles from './app.module.css';
// context imports
import { ProductContext } from '../state/contexts/ProductContext';

// import components
import Header from './Header/index.jsx';
import OverView from './OverView/index.jsx';
import QASection from './QA/index.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';
import RelatedItemsAndOutfit from './Related/index.jsx';


const App = () => {
  const {
    sampleProduct,
    setSampleProduct,
    productList,
    setProductList,
    someFunc,
  } = useContext(ProductContext);

  useEffect(() => {
    // console.log({ sampleProduct });
    // someFunc();
  }, []);

    return (
      <div className={styles.appContainer}>
        <Header />
        <OverView />
        <div className={styles.componentContainer}>
          <RelatedItemsAndOutfit />
          <QASection/>
          <RatingsAndReviews/>
        </div>
      </div>
  );
};

export default App;
