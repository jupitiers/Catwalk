import React, { useContext } from 'react';
import styles from './createReview.module.css';
import { ReviewContext } from '../../../state/contexts/ReviewsContext';

export const CreateReview = ({ children }) => {
  const {
    showCreate, hideCreate, submitHandler, changeHandler,
  } = useContext(ReviewContext);
  const showHideClassName = showCreate ? styles.show : styles.hide;
  console.log({ showCreate });
  return (
    <div className={showHideClassName}>
      <section className={styles.formModalMain}>
        {children}
        <>
          <span onClick={hideCreate} className={styles.iconWrapper}>
            <i className="far fa-times-circle" />
          </span>
          <div className={styles.formContainer}>
            <form onSubmit={submitHandler} className={styles.form}>
              <button type="submit"> Add Review </button>
            </form>
          </div>
        </>
      </section>
    </div>
  );
};
