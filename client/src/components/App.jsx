import React from 'react';
import styles from './app.module.css';
// context imports

// import components
import Header from './Header/index';
import OverView from './OverView/index';
import QASection from './QA/QAindex';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews';
import RelatedItemsAndOutfit from './Related/index';

const App = () => (
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

export default App;
