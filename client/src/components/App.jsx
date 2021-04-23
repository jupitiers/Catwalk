import React, { useContext, useEffect } from 'react';
import styles from './app.module.css';
// context imports
import { ProductContext } from '../state/contexts/ProductContext';
import { APIContext } from '../state/contexts/APIContext';

// import components
import Header from './Header/index';
import OverView from './OverView/index';
import QASection from './QA/QAindex';
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
    getProductStyles,
    getReviewsByProductId,
  } = useContext(APIContext);

  useEffect(() => {
    getProductById();
    getProductStyles();
    getReviewsByProductId();
  },[]);

  const { trackClick } = useContext(APIContext);
  return (
    <div className={styles.appContainer} onClick={(e) => trackClick(e)}>
      <div className="overview">
        <Header />
        <OverView />
      </div>
      <div className={styles.componentContainer}>
        <div className="related">
          <RelatedItemsAndOutfit />
        </div>
        <div className="questions">
          <QASection />
        </div>
        <div className="reviews">
          <RatingsAndReviews />
        </div>
      </div>
    </div>
  );
};

export default App;
