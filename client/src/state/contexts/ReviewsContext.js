import React, { createContext, useContext, useState } from 'react';

export const ReviewContext = createContext({});

const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        setReviews,
        feedbackGiven,
        setFeedbackGiven,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewProvider;
