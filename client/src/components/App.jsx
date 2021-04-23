import React, { useEffect, useContext } from 'react';
import styles from './app.module.css';
// context imports
import { ProductContext } from '../state/contexts/ProductContext';
import { APIContext } from '../state/contexts/APIContext';

// import components
import Header from './Header/index';
import OverView from './OverView/index';
import QASection from './QA/index';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews';
import RelatedItemsAndOutfit from './Related/index';

const App = () => {
  const {
    sampleProduct,
    setSampleProduct,
    productList,
    setProductList,
    someFunc,
  } = useContext(ProductContext);

  const {
    getProductById,
    getProductStyles
  } = useContext(APIContext);

  useEffect(() => {
    getProductById();
    getProductStyles();
  }, []);

  return (
    <div className={styles.appContainer}>
      <Header />
      <OverView />
      <div className={styles.componentContainer}>
        <RelatedItemsAndOutfit />
        <QASection />
        <RatingsAndReviews />
      </div>
    </div>
  );
};

export default App;
