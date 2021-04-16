import React, {createContext, useContext, useState} from 'react';
import axios from 'axios'
import {REACT_APP_API_KEY} from '../../../../config/config';
import { ReviewContext } from './ReviewsContext';

export const APIContext = createContext({});

const APIProvider = ({children}) => {
  const {reviews, setReviews} = useContext(ReviewContext);

const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp'

// sample endpoints
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews?product_id=17067
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=17067

// sample request to get all products

  /******************************************************************************
  *                      API calls for products
  ******************************************************************************/
const getAllProducts = async () => {
  try {
    const products = await axios.get(`${baseURL}/products`, {
      headers: {'Authorization': REACT_APP_API_KEY}
    })
  }catch (err) {
    console.log(err)
  }
}

  /******************************************************************************
  *                      API calls for reviews
  ******************************************************************************/
const getReviewsByProductId = async() => {
    try {
    const reviews = await axios.get(`${baseURL}/reviews?product_id=17067`, {
      headers: {'Authorization': REACT_APP_API_KEY}
    })
    setReviews(reviews.data.results);
  }catch (err) {
    console.log(err)
  }
}

const markReviewAsHelpful = async(reviewId) => {
    try {
    await axios.put(`${baseURL}/reviews/${reviewId}/helpful`, null, {
      headers: {'Authorization': REACT_APP_API_KEY}
    })
    getReviewsByProductId();
  }catch (err) {
    console.log(err)
  }
}


  return (
    <APIContext.Provider
      value={{
        getAllProducts,
        getReviewsByProductId,
        markReviewAsHelpful,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export default APIProvider;
