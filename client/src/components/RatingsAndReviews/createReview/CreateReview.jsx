import React, { useContext } from 'react';
import styles from './createReview.module.css';
import { ReviewContext } from '../../../state/contexts/ReviewsContext';
import { fullStar, emptyStar } from '../starRatings';

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
              <div className={styles.rating}>
                <p>
                  <b>Overall Rating: </b>
                </p>
                <span className={styles.star}>{emptyStar}</span>
                <span className={styles.star}>{emptyStar}</span>
                <span className={styles.star}>{emptyStar}</span>
                <span className={styles.star}>{emptyStar}</span>
                <span className={styles.star}>{emptyStar}</span>
              </div>
              <div className={styles.reccommend}>
                <p>Do you reccommend this product?</p>
                <div className={styles.radioChoice}>
                  <label htmlFor="yes">Yes</label>
                  <input type="radio" name="yes" id="yes" />
                </div>
                <div className={styles.radioChoice}>
                  <label htmlFor="no">No</label>
                  <input type="radio" name="no" id="no" />
                </div>

              </div>
              <div className={styles.characteristics}>
                <h4>Characteristics</h4>
                <div className={styles.charTypes}>
                  <p>
                    Quality
                  </p>
                  <p>
                    Size
                  </p>
                  <p>
                    Comfort
                  </p>
                  <p>
                    Width
                  </p>
                  <p>
                    Length
                  </p>
                  <p>
                    Fit
                  </p>
                </div>
                <div className={styles.charChoices}>
                  <div className={styles.radioChoice}>
                    <label htmlFor="one">1</label>
                    <input type="radio" name="one" id="one" />
                  </div>
                  <div className={styles.radioChoice}>
                    <label htmlFor="two">2</label>
                    <input type="radio" name="two" id="two" />
                  </div>
                  <div className={styles.radioChoice}>
                    <label htmlFor="three">3</label>
                    <input type="radio" name="three" id="three" />
                  </div>
                  <div className={styles.radioChoice}>
                    <label htmlFor="four">4</label>
                    <input type="radio" name="four" id="four" />
                  </div>
                  <div className={styles.radioChoice}>
                    <label htmlFor="five">5</label>
                    <input type="radio" name="five" id="five" />
                  </div>
                </div>
              </div>
              <div className={styles.upload}>
                <label htmlFor="upload">
                  <p>Upload Images</p>
                  <input type="file" id="upload" />
                </label>
                <div className={styles.images}>
                  <div className={styles.thumbnail} style={{ backgroundImage: 'url(\'https://images.unsplash.com/photo-1517923368558-70ca9ac84b39?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dGhpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60\')' }} />
                  <div className={styles.thumbnail} style={{ backgroundImage: 'url(\'https://images.unsplash.com/photo-1523132797263-747d5d0dbbb3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHRoaW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60\')' }} />
                  <div className={styles.thumbnail} style={{ backgroundImage: 'url(\'https://images.unsplash.com/photo-1486401899868-0e435ed85128?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fHRoaW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60\')' }} />
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
