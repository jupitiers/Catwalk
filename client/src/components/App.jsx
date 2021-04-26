import React, { useContext, useEffect } from 'react';
import styles from './app.module.css';
// context imports
import { APIContext } from '../state/contexts/APIContext';

// import components
import Header from './Header/index';
import OverView from './OverView/index';
import QASection from './QA/QAindex';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews';
import RelatedItemsAndOutfit from './Related/index';

const App = () => {
  const {
    getProductById,
    getProductStyles,
    getReviewsByProductId,
  } = useContext(APIContext);

  useEffect(() => {
    getProductById();
    getProductStyles();
    getReviewsByProductId();
  }, []);

  return (
    <div className={styles.appContainer}>
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
