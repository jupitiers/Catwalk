import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { ReviewContext } from './ReviewsContext';
import { QuestionContext } from './QuestionsContext';
import { AnswerContext } from './AnswersContext';
import { ProductContext } from './ProductContext';
import { RelatedContext } from './RelatedContext';

export const APIContext = createContext({});

const APIProvider = ({ children }) => {
  // context imports
  const {
    setReviews,
    feedback,
    setFeedback,
    sortTerm,
    setMetaData,
    newReview,
  } = useContext(ReviewContext);
  const { setQuestions } = useContext(QuestionContext);
  const { setAnswers } = useContext(AnswerContext);
  const {
    setRelatedProducts,
    setRelatedProductInfo,
    setAllRelatedProductInfo,
    setRelatedReviewMetaData,
    setRelatedProductStyles,
    setOutfitStyle,
    setOutfitReviewMetaData,
  } = useContext(RelatedContext);

  const { setSelectedProduct, setStyleList, setStyleSelected } = useContext(ProductContext);

  // hard coded product id for use in all components
  const [productId, setProductId] = useState('17069');

  /** ****************************************************************************
  *                      API calls for products
  ***************************************************************************** */
  const getAllProducts = async () => {
    try {
      const prods = await axios.get('/products');
      console.log(prods);
    } catch (err) {
      console.log(err);
    }
  };

  const getProductById = async (relatedId = productId) => { // changedpid
    try {
      const product = await axios.get(`/products/${relatedId}`);
      setSelectedProduct(product.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getRelatedProducts = async () => {
    try {
      const products = await axios.get(`/products/${productId}/related`);
      setRelatedProducts(products.data);
      return (products.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getRelatedProductInfoById = async (id) => {
    try {
      const product = await axios.get(`/products/${id}`);
      setRelatedProductInfo(product.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllRelatedProductInfo = async (ids) => {
    const productsInfo = [];
    let product;
    for (let i = 0; i < ids.length; i++) {
      product = await axios.get(`/products/${ids[i]}`);
      productsInfo.push(product.data);
    }
    setAllRelatedProductInfo(productsInfo);
  };

  const getAllRelatedReviewMetaData = async (ids) => {
    const reviewInfo = [];
    let product;
    for (let i = 0; i < ids.length; i++) {
      product = await axios.get(`/reviews/meta/?product_id=${ids[i]}`);
      reviewInfo.push(product.data);
    }
    setRelatedReviewMetaData(reviewInfo);
    return reviewInfo;
  };

  const getAllOutfitReviewMetaData = async (ids) => {
    const reviewInfo = [];
    let product;
    for (let i = 0; i < ids.length; i++) {
      product = await axios.get(`/reviews/meta/?product_id=${ids[i]}`);
      reviewInfo.push(product.data);
    }
    setOutfitReviewMetaData(reviewInfo);
    return reviewInfo;
  };

  const getAllRelatedStyles = async (ids) => {
    const styles = [];
    let product;
    for (let i = 0; i < ids.length; i++) {
      product = await axios.get(`/products/${ids[i]}/styles`);
      styles.push(product.data);
    }
    setRelatedProductStyles(styles);
  };

  const getAllOutfitStyles = async (ids) => {
    const styles = [];
    let product;
    for (let i = 0; i < ids.length; i++) {
      product = await axios.get(`/products/${ids[i]}/styles`);
      styles.push(product.data);
    }
    setOutfitStyle(styles);
    return styles;
  };
  const getProductStyles = async () => {
    try {
      const getStyles = await axios.get(`/products/${productId}/styles`);
      setStyleList(getStyles.data);
      setStyleSelected(getStyles.data.results[0]);
      return getStyles.data;
    } catch (err) {
      console.log({ err });
    }
  };

  /** ****************************************************************************
  *                      API calls for QAs
  ***************************************************************************** */

  const getQuestionsByProductId = async () => {
    try {
      const allQuestions = await axios.get(`/qa/questions?product_id=${productId}&count=100`);
      setQuestions(allQuestions.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const getAnswersByQuestionId = async (questionId) => {
    try {
      const allAnswers = await axios.get(`/qa/questions/${questionId}/answers`);
      setAnswers(allAnswers.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const markQuestionAsHelpful = async (questionId) => {
    try {
      await axios.put(`/qa/questions/${questionId}/helpful`, null);
      getQuestionsByProductId();
    } catch (err) {
      console.log(err);
    }
  };

  const markAnswerAsHelpful = async (answerId) => {
    try {
      await axios.put(`/qa/answers/${answerId}/helpful`, null);
      getQuestionsByProductId();
    } catch (err) {
      console.log(err);
    }
  };

  const reportQuestion = async (questionId) => {
    try {
      await axios.put(`/qa/questions/${questionId}/report`, null);
      getQuestionsByProductId();
    } catch (err) {
      console.log(err);
    }
  };

  const reportAnswer = async (answerId) => {
    try {
      await axios.put(`/qa/answers/${answerId}/report`, null);
      getQuestionsByProductId();
    } catch (err) {
      console.log(err);
    }
  };

  const addQuestion = async (questionData) => {
    try {
      console.log(questionData);
      await axios.post('/qa/questions', questionData);
      getQuestionsByProductId();
    } catch (err) {
      console.log(err);
    }
  };

  const addAnswer = async (questionId, answerData) => {
    try {
      await axios.post(`/qa/questions/${questionId}/answers`, answerData);
      getQuestionsByProductId();
    } catch (err) {
      console.log(err);
    }
  };

  /** ****************************************************************************
  *                      API calls for reviews
  ***************************************************************************** */

  const getReviewsByProductId = async () => {
    try {
      const allReviews = await axios.get(`/reviews?product_id=${productId}&count=100&sort=${sortTerm}`);
      setReviews(allReviews.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const markReviewAsHelpful = async (reviewId) => {
    try {
      await axios.put(`/reviews/${reviewId}/helpful`, null);
      getReviewsByProductId();
      setFeedback({
        ...feedback,
        [reviewId]: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const reportReview = async (reviewId) => {
    try {
      await axios.put(`/reviews/${reviewId}/report`, null);
      getReviewsByProductId();
    } catch (err) {
      console.log(err);
    }
  };

  const getReviewMetaDataByProductId = async () => {
    try {
      const data = await axios.get(`/reviews/meta/?product_id=${productId}`);
      setMetaData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createNewReview = async () => {
    try {
      const data = await axios.post('/reviews', newReview);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  /** ****************************************************************************
  *                      API call for click-tracking
  ***************************************************************************** */

  const trackClick = async (e) => {
    const data = {
      element: '',
      widget: '',
      time: new Date(),
    };
    // run check for closest for each widget return one that isnt null
    const elem = e.target;
    if (elem.closest('.overview')) {
      data.widget = 'overview';
    } else if (elem.closest('.related')) {
      data.widget = 'related';
    } else if (elem.closest('.questions')) {
      data.widget = 'questions';
    } else if (elem.closest('.reviews')) {
      data.widget = 'reviews';
    }
    // if outerHTML is > 1000 chars elem is body
    const elemString = e.target.outerHTML;
    if (elemString.length > 1000) {
      data.element = '<body></body>';
    } else {
      data.element = elemString;
    }
    if (data.widget && data.element) {
      try {
        await axios.post('/interactions', data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <APIContext.Provider
      value={{
        productId,
        setProductId,
        // Products
        getAllProducts,
        getProductById,
        getRelatedProducts,
        getRelatedProductInfoById,
        getAllRelatedProductInfo,
        getAllRelatedReviewMetaData,
        getAllRelatedStyles,
        getAllOutfitStyles,
        getProductStyles,
        getAllOutfitReviewMetaData,
        // QAs
        getQuestionsByProductId,
        getAnswersByQuestionId,
        markQuestionAsHelpful,
        markAnswerAsHelpful,
        reportQuestion,
        reportAnswer,
        addQuestion,
        addAnswer,
        // Reviews
        getReviewsByProductId,
        markReviewAsHelpful,
        reportReview,
        getReviewMetaDataByProductId,
        createNewReview,
        // click tracker
        trackClick,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export default APIProvider;
