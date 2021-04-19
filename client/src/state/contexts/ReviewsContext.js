import React, { createContext, useContext, useState } from 'react';

export const ReviewContext = createContext({});

const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [feedbackAlreadyGiven, setFeedbackAlreadyGiven] = useState(false);
  const [display, setDisplay] = useState('none');
  const [selectedImage, setSelectedImage] = useState('');
  const [reviewsShowing, setReviewsShowing] = useState(2);
  const [sortTerm, setSortTerm] = useState('relevant');
  const [metaData, setMetaData] = useState({});
  const [starSorting, setStarSorting] = useState(false);
  const [starFilter, setStarFilter] = useState(['1', '2', '3', '4', '5']);
  // createReview state
  const [showCreate, setShowCreate] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    email: '',
    summary: '',
    body: '',
    rating: 0,
    recommended: false,
    characteristics: {},
    photos: [],
  });

  // createReview logic
  const openCreate = () => {
    setShowCreate(true);
  };

  const hideCreate = () => {
    setShowCreate(false);
  };

  const createChangeHandler = (e) => {

  };

  const createSubmitHandler = (e) => {

  };

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

  const clearFilter = () => {
    setStarSorting(false);
    setStarFilter(['1', '2', '3', '4', '5']);
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        setReviews,
        feedbackAlreadyGiven,
        setFeedbackAlreadyGiven,
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
        clearFilter,
        showCreate,
        openCreate,
        hideCreate,
        createChangeHandler,
        createSubmitHandler,
        newReview,
        setNewReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewProvider;
