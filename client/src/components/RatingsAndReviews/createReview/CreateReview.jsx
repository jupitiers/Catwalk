import React, { useContext, useEffect, useState } from 'react';
import styles from './createReview.module.css';
import { ReviewContext } from '../../../state/contexts/ReviewsContext';
import { fullStar, emptyStar } from '../starRatings';
import { getCharacteristicsArray } from '../../../helpers/ratingsHelpers';
import { ProductContext } from '../../../state/contexts/ProductContext';
import { APIContext } from '../../../state/contexts/APIContext';

export const CreateReview = ({ children }) => {
  // context imports
  const {
    showCreate, hideCreate, metaData, newReview,
    setNewReview, handleImageUpload, inputChangeHandler,
    submitHandler, changeCharacteristic, recommend,
    setRecommend, bodyChangeHandler, changeRecommendation,
    bodyCountDown, stars, setStars, changeRating, ratingText, errors, validateForm,
  } = useContext(ReviewContext);
  const { getProductById, createNewReview } = useContext(APIContext);
  const { selectedProduct } = useContext(ProductContext);
  // using helper functions
  const characteristics = getCharacteristicsArray(metaData.characteristics);
  const descriptions = getCharacteristicsArray(metaData.characteristics);
  // modal class for show / hide styles
  const showHideClassName = showCreate ? styles.show : styles.hide;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProductById();
  }, []);

  useEffect(() => {
    setNewReview({
      ...newReview,
      product_id: selectedProduct.id,
    });
  }, [selectedProduct]);

  const submitForm = async (e) => {
    e.preventDefault();
    const areErrors = validateForm();
    if (!areErrors) {
      setLoading(true);
      try {
        await createNewReview(newReview);
        setLoading(false);
        hideCreate();
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };

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
            <h3>
              about the
              {' '}
              {selectedProduct.name}
            </h3>
            <form onSubmit={submitForm} className={styles.form}>
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
                ) : (
                  <p>Minium reached</p>
                )}
              </div>
              <div className={styles.rating}>
                <h4>
                  <b>Overall Rating * </b>
                </h4>
                <span className={styles.errorText}>{errors.rating && errors.rating}</span>
                <div className={styles.stars}>
                  {stars.map((star, idx) => (
                    <div
                      className={styles.star}
                      key={idx}
                      onClick={() => changeRating(idx)}
                    >
                      {star}
                    </div>
                  ))}
                  <p>{ratingText}</p>
                </div>
                {' '}
              </div>
              <div className={styles.recommend}>
                <p>Do you recommend this product?</p>
                <div className={styles.recommendRadios}>
                  <div className={styles.radioChoice}>
                    <label htmlFor="yes">Yes</label>
                    <input onChange={changeRecommendation} type="radio" name="yes" id="yes" checked={recommend} />
                  </div>
                  <div className={styles.radioChoice}>
                    <label htmlFor="no">No</label>
                    <input
                      onChange={changeRecommendation}
                      type="radio"
                      name="no"
                      id="no"
                      checked={!recommend}
                    />
                  </div>
                </div>

              </div>
              <div className={styles.characteristics}>
                <h4>Characteristics</h4>
                <div className={styles.charTypes}>
                  {characteristics.length > 0 && characteristics.map((ch, idx) => {
                    const [currentDesc] = descriptions.filter((d) => d.id === ch.id);
                    return (
                      <div key={idx}>
                        <div className={styles.charHeading} key={idx}>
                          <p>
                            {ch.name}
                            :
                          </p>
                          {' '}
                          <span style={{ marginLeft: '1em', fontWeight: 'bold', color: '#641373' }}>
                            {newReview.characteristics[ch.id] && (
                              currentDesc.descriptions[newReview.characteristics[ch.id]]
                            )}
                          </span>
                        </div>
                        <div className={styles.charChoices}>
                          <div className={styles.radioChoice}>
                            <label htmlFor={`${ch.name}1`}>1</label>
                            <input
                              onChange={changeCharacteristic}
                              type="radio"
                              name={ch.id}
                              id={`${ch.name}1`}
                              value="1"
                            />
                          </div>
                          <div className={styles.radioChoice}>
                            <label htmlFor={`${ch.name}2`}>2</label>
                            <input
                              onChange={changeCharacteristic}
                              type="radio"
                              name={ch.id}
                              id={`${ch.name}2`}
                              value="2"
                            />
                          </div>
                          <div className={styles.radioChoice}>
                            <label htmlFor={`${ch.name}3`}>3</label>
                            <input
                              onChange={changeCharacteristic}
                              type="radio"
                              name={ch.id}
                              id={`${ch.name}3`}
                              value="3"
                            />
                          </div>
                          <div className={styles.radioChoice}>
                            <label htmlFor={`${ch.name}4`}>4</label>
                            <input
                              onChange={changeCharacteristic}
                              type="radio"
                              name={ch.id}
                              id={`${ch.name}4`}
                              value="4"
                            />
                          </div>
                          <div className={styles.radioChoice}>
                            <label htmlFor={`${ch.name}5`}>5</label>
                            <input
                              onChange={changeCharacteristic}
                              type="radio"
                              name={ch.id}
                              id={`${ch.name}5`}
                              value="5"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
              <div className={styles.upload}>
                {newReview.photos.length < 5 && (
                <label htmlFor="upload">
                  <p>Upload Images</p>
                  <span>Max 5</span>
                  <input
                    type="file"
                    id="upload"
                    onChange={handleImageUpload}
                  />
                </label>

                )}
                <div className={styles.images}>
                  {newReview.photos.length > 0 && newReview.photos.map((photo, idx) => (
                    <div key={idx} className={styles.thumbnail} style={{ backgroundImage: `url(${photo})` }} />
                  ))}
                </div>
              </div>
              <div className={styles.submit}>
                <button type="submit">
                  {loading ? (
                    <span className={styles.loading}>Submitting</span>
                  )
                    : 'Sumbit'}
                </button>
              </div>
            </form>
          </div>
        </>
      </section>
    </div>
  );
};
