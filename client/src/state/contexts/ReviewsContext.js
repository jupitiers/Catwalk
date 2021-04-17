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
  const [starSorting, setStarSorting] = useState(false);
  const [starFilter, setStarFilter] = useState(['1', '2', '3', '4', '5']);

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
    if (starSorting) {
      if (starFilter.includes(star)) {
        let filteredStars = starFilter.filter((s) => s !== star);
        if (filteredStars.length === 0) {
          filteredStars = ['1', '2', '3', '4', '5'];
        }
        setStarFilter(filteredStars);
      } else {
        setStarFilter([
          ...starFilter,
          star,
        ]);
      }
    } else {
      setStarSorting(true);
      setStarFilter([
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
        starSorting,
        setStarSorting,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewProvider;
