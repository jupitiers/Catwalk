import React, { createContext, useContext, useState } from 'react';

export const ReviewContext = createContext({});

const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [feedbackAlreadyGiven, setFeedbackAlreadyGiven] = useState(false);

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        setReviews,
        feedbackAlreadyGiven,
        setFeedbackAlreadyGiven,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewProvider;
