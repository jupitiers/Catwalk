import React, { createContext, useContext, useState } from 'react';
import { REACT_APP_CLOUDINARY_URL } from '../../config/config';
import { getCharacteristicsArray } from '../../helpers/ratingsHelpers';

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
  const [recommend, setRecommend] = useState(false);
  const [bodyCountDown, setBodyCountDown] = useState(50);
  const [showCreate, setShowCreate] = useState(true);
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

  // createReview logic
  const openCreate = () => {
    setShowCreate(true);
  };

  const hideCreate = () => {
    setShowCreate(false);
  };

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', 'wq9qoqey');
    formData.append('folder', 'catwalk');
    try {
      const res = await fetch(REACT_APP_CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      });
      const file = await res.json();
      if (res) {
        if (newReview.photos.length < 5) {
          setNewReview({
            ...newReview,
            photos: [
              ...newReview.photos,
              file.url,
            ],
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const inputChangeHandler = (e) => {
    setNewReview({
      ...newReview,
      [e.target.name]: e.target.value,
    });
  };

  const bodyChangeHandler = (e) => {
    setNewReview({
      ...newReview,
      body: e.target.value,
    });
    if (e.target.value.length <= 50) {
      setBodyCountDown(50 - e.target.value.length);
    }
  };

  const changeCharacteristic = (e) => {
    setNewReview({
      ...newReview,
      characteristics: {
        ...newReview.characteristics,
        [e.target.name]: e.target.value,
      },
    });
  };

  const validateForm = () => {

  };

  const submitHandler = (e) => {
    e.preventDefault();
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
        newReview,
        setNewReview,
        handleImageUpload,
        submitHandler,
        inputChangeHandler,
        changeCharacteristic,
        recommend,
        setRecommend,
        bodyChangeHandler,
        bodyCountDown,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewProvider;
