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
            <h2>Write your review</h2>
            <h3>about the product name</h3>
            <form onSubmit={submitHandler} className={styles.form}>
              <div className={styles.inputs}>
                <label htmlFor="nickname">
                  Nickname
                </label>
                <input type="text" name="nickname" id="nickname" value="" placeholder="Example: jackson11" reqired />
                <label htmlFor="email">
                  Email
                </label>
                <input type="email" name="email" id="email" value="" placeholder="Example: jackson11@gmail.com" required />
                <label htmlFor="summary">
                  Summary
                </label>
                <input type="text" name="summary" id="summary" value="" placeholder="Example: Best purchase ever!" />
                <label htmlFor="body">
                  Body
                </label>
                <textarea rows="3" type="text" name="body" id="body" value="" placeholder="Example: Why did you like the product or not" />
                <p>Minimum required characters left: 50 </p>
              </div>
              <div className={styles.rating}>rating</div>
              <div className={styles.reccommend}>reccommend</div>
              <div className={styles.characteristics}>characteristics</div>
              <div className={styles.upload}>
                <label htmlFor="upload">
                  <p>Upload Images</p>
                  <input type="file" id="upload" />
                </label>
                <div className={styles.images}>
                  <div className={styles.thumbnail} />
                  <div className={styles.thumbnail} />
                  <div className={styles.thumbnail} />
                </div>
              </div>
              <div className={styles.submit}>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </>
      </section>
    </div>
  );
};
