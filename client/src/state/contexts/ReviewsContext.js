import React, {createContext, useContext, useState} from 'react';

export const ReviewContext = createContext({});

const ReviewProvider = ({children}) => {
  const [reviews, setReviews] = useState([]);


  return (
    <ReviewContext.Provider
      value={{
        reviews,
        setReviews,
      }}
    >
    {children}
    </ReviewContext.Provider>
  );
};

export default ReviewProvider;