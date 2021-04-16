import React, { createContext, useContext, useState } from 'react';

export const ReviewContext = createContext({});

const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [display, setDisplay] = useState('none');
  const [selectedImage, setSelectedImage] = useState('');

  const openOverlay = (imageUrl) => {
    setDisplay('block');
    setSelectedImage(imageUrl);
  };
  const closeOverlay = () => {
    setDisplay('none');
    setSelectedImage('');
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        setReviews,
        feedbackGiven,
        setFeedbackGiven,
        display,
        setDisplay,
        openOverlay,
        closeOverlay,
        selectedImage,
        setSelectedImage,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewProvider;
