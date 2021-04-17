import React, { createContext, useContext, useState } from 'react';

export const ReviewContext = createContext({});

const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [display, setDisplay] = useState('none');
  const [selectedImage, setSelectedImage] = useState('');
  const [reviewsShowing, setReviewsShowing] = useState(2);
  const [sortTerm, setSortTerm] = useState('relevant');
  const [metaData, setMetaData] = useState({});
  const [starFilter, setStarFilter] = useState([]);

  // reviewImages logic
  const openOverlay = (imageUrl) => {
    setDisplay('block');
    setSelectedImage(imageUrl);
  };
  const closeOverlay = () => {
    setDisplay('none');
    setSelectedImage('');
  };

  // ratingsAndReviews logic
  const showMoreReviews = () => {
    setReviewsShowing(reviewsShowing + 2);
  };

  const filterByStars = (star) => {
    console.log(star);
    if (starFilter.includes(star)) {
      const filteredStars = starFilter.filter((s) => s !== star);
      setStarFilter(filteredStars);
    } else {
      setStarFilter([
        ...starFilter,
        star,
      ]);
    }
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
        reviewsShowing,
        setReviewsShowing,
        showMoreReviews,
        sortTerm,
        setSortTerm,
        metaData,
        setMetaData,
        starFilter,
        setStarFilter,
        filterByStars,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewProvider;
