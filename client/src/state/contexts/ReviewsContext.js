import React, { createContext, useContext, useState } from 'react';

export const ReviewContext = createContext({});

const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [alreadyGaveFeedback, setAlreadyGaveFeedback] = useState(false);

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        setReviews,
        alreadyGaveFeedback,
        setAlreadyGaveFeedback,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewProvider;
