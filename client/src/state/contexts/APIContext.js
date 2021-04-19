import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { REACT_APP_API_KEY } from '../../config/config';
import { ReviewContext } from './ReviewsContext';
import { QuestionContext } from './QuestionsContext';
import { AnswerContext } from './AnswersContext';


export const APIContext = createContext({});

const APIProvider = ({ children }) => {
  const {
    reviews, setReviews, setFeedbackAlreadyGiven, sortTerm, setMetaData,
  } = useContext(ReviewContext);
  const { questions, setQuestions } = useContext(QuestionContext);
  const { answers, setAnswers } = useContext(AnswerContext);




  const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';

  // sample endpoints
  // https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=17067

  // sample request to get all products

  /** ****************************************************************************
  *                      API calls for products
  ***************************************************************************** */
  const getAllProducts = async () => {
    try {
      const products = await axios.get(`${baseURL}/products`, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
    } catch (err) {
      console.log(err);
    }
  };

  /** ****************************************************************************
  *                      API calls for QAs
  ***************************************************************************** */

   const getQuestionsByProductId = async () => {
    try {
      const allQuestions = await axios.get(`${baseURL}/qa/questions?product_id=17069`, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      setQuestions(allQuestions.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const getAnswersByQuestionId = async (questionId) => {
    try {
      const allAnswers = await axios.get(`${baseURL}/qa/questions/${questionId}/answers`, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      setAnswers(allAnswers.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const markQuestionAsHelpful = async (questionId) => {
    try {
      await axios.put(`${baseURL}/qa/questions/${questionId}/helpful`, null, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      getQuestionsByProductId();
    } catch (err) {
      console.log(err);
    }
  };

  const markAnswerAsHelpful = async (answerId) => {
    try {
      await axios.put(`${baseURL}/qa/answers/${answerId}/helpful`, null, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      getQuestionsByProductId();
    } catch (err) {
      console.log(err);
    }
  };

  const reportQuestion = async (questionId) => {
    try {
      await axios.put(`${baseURL}/qa/questions/${questionId}/report`, null, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      getQuestionsByProductId();
    } catch (err) {
      console.log(err);
    }
  };

  const reportAnswer = async (answerId) => {
    try {
      await axios.put(`${baseURL}/qa/answers/${answerId}/report`, null, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      getQuestionsByProductId();
    } catch (err) {
      console.log(err);
    }
  };

  /** ****************************************************************************
  *                      API calls for reviews
  ***************************************************************************** */
  // example urls
  // https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews?product_id=17069&count=100
  // https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta?product_id=17069

  const pId = '17068'

  const getReviewsByProductId = async () => {
    try {
      const allReviews = await axios.get(`${baseURL}/reviews?product_id=${pId}&count=100&sort=${sortTerm}`, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      setReviews(allReviews.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const markReviewAsHelpful = async (reviewId) => {
    try {
      await axios.put(`${baseURL}/reviews/${reviewId}/helpful`, null, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      getReviewsByProductId();
      setFeedbackAlreadyGiven(true);
    } catch (err) {
      console.log(err);
    }
  };
  const reportReview = async (reviewId) => {
    try {
      await axios.put(`${baseURL}/reviews/${reviewId}/report`, null, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      getReviewsByProductId();
      setFeedbackAlreadyGiven(true);
    } catch (err) {
      console.log(err);
    }
  };

  const getReviewMetaDataByProductId = async (reviewId) => {
    try {
      const data = await axios.get(`${baseURL}/reviews/meta/?product_id=${pId}`, {
        headers: { Authorization: REACT_APP_API_KEY },
      });
      setMetaData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <APIContext.Provider
      value={{
        //Products
        getAllProducts,
        //QAs
        getQuestionsByProductId,
        getAnswersByQuestionId,
        markQuestionAsHelpful,
        markAnswerAsHelpful,
        reportQuestion,
        reportAnswer,
        //Reviews
        getReviewsByProductId,
        markReviewAsHelpful,
        reportReview,
        getReviewMetaDataByProductId,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export default APIProvider;
