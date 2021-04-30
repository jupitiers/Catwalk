import React, { useContext } from 'react';
import styles from './createReview.module.css';
import { ReviewContext } from '../../../state/contexts/ReviewsContext';

export function TextInputs() {
  const {
    errors, newReview, inputChangeHandler, bodyChangeHandler, bodyCountDown,
  } = useContext(ReviewContext);
  return (
    <div className={styles.inputs}>
      <label htmlFor="name">
        Nickname *
        <span className={styles.errorText}>{errors.name && errors.name}</span>
      </label>
      <input
        className={errors.email !== '' ? styles.errorInput : ''}
        type="text"
        name="name"
        id="name"
        value={newReview.name}
        placeholder="Example: jackson11"
        onChange={inputChangeHandler}
      />
      <p>For privacy reasons, do not use your full name or email address</p>

      <label htmlFor="email">
        Email *
        <span className={styles.errorText}>{errors.email && errors.email}</span>
      </label>
      <input
        className={errors.email !== '' ? styles.errorInput : ''}
        type="email"
        name="email"
        id="email"
        value={newReview.email}
        placeholder="Example: jackson11@gmail.com"
        onChange={inputChangeHandler}
      />
      <p>For authentication reasons, you will not be emailed</p>
      <label htmlFor="summary">
        Summary
      </label>
      <input
        type="text"
        name="summary"
        id="summary"
        maxLength="60"
        value={newReview.summary}
        placeholder="Example: Best purchase ever!"
        onChange={inputChangeHandler}
      />
      <label htmlFor="body">
        Body *
        {' '}
        <span className={styles.errorText}>{errors.body && errors.body}</span>
      </label>
      <textarea
        className={errors.body !== '' ? styles.errorInput : ''}
        rows="3"
        type="text"
        name="body"
        id="body"
        minLength="50"
        maxLength="1000"
        value={newReview.body}
        placeholder="Example: Why did you like the product or not"
        onChange={bodyChangeHandler}
      />
      {bodyCountDown > 0 ? (
        <p>
          Minimum required characters left:
          {' '}
          {bodyCountDown}
        </p>
      ) : <p>Minium reached</p>}
    </div>
  );
}
