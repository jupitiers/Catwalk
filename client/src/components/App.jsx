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
    <Header />
    <OverView />
    <div className={styles.componentContainer}>
      <RelatedItemsAndOutfit />
      <QASection />
      <RatingsAndReviews />
    </div>
  </div>
);

export default App;
