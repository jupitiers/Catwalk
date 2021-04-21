import React, { createContext, useContext, useState } from 'react';
import { REACT_APP_CLOUDINARY_URL } from '../../config/config';
import { getCharacteristicsArray, createStarArray } from '../../helpers/ratingsHelpers';
// default reviews for testing
const defaultReviews = [
  {
    review_id: 0,
    rating: 0,
    summary: '',
    recommend: false,
    response: '',
    body: '',
    date: '',
    reviewer_name: '',
    helpfulness: 0,
    photos: [],
  },
  {
    review_id: 3,
    rating: 0,
    summary: '',
    recommend: false,
    response: '',
    body: '',
    date: '',
    reviewer_name: '',
    helpfulness: 0,
    photos: [],
  },
  {
    review_id: 3,
    rating: 0,
    summary: '',
    recommend: false,
    response: '',
    body: '',
    date: '',
    reviewer_name: '',
    helpfulness: 0,
    photos: [],
  },
];

const defaultMetaData = {
  product_id: '2',
  ratings: {
    2: 1,
    3: 1,
    4: 2,
    // ...
  },
  recommended: {
    0: 5,
    // ...
  },
  characteristics: {
    Size: {
      id: 14,
      value: '4.0000',
    },
    Width: {
      id: 15,
      value: '3.5000',
    },
    Comfort: {
      id: 16,
      value: '4.0000',
    },
    // ...
  },
};

export const ReviewContext = createContext();

const ReviewProvider = ({ children }) => {
  // context imports
  const [reviews, setReviews] = useState(defaultReviews);
  const [feedbackAlreadyGiven, setFeedbackAlreadyGiven] = useState(false);
  const [display, setDisplay] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [reviewsShowing, setReviewsShowing] = useState(2);
  const [sortTerm, setSortTerm] = useState('relevant');
  const [metaData, setMetaData] = useState(defaultMetaData);
  const [starSorting, setStarSorting] = useState(false);
  const [starFilter, setStarFilter] = useState(['1', '2', '3', '4', '5']);
  // createReview state
  const [stars, setStars] = useState(createStarArray(0));
  const ratingDescriptions = {
    1: 'Poor',
    2: 'Fair',
    3: 'Average',
    4: 'Good',
    5: 'Great',
  };
  const [ratingText, setRatingText] = useState();
  const [recommend, setRecommend] = useState(false);
  const [bodyCountDown, setBodyCountDown] = useState(50);
  const [showCreate, setShowCreate] = useState(false);
  const [newReview, setNewReview] = useState({
    product_id: '',
    name: '',
    email: '',
    summary: '',
    body: '',
    rating: 0,
    recommend: false,
    characteristics: {},
    photos: [],
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    body: '',
    rating: '',
  });

  // reviewImages logic
  const openOverlay = (imageUrl) => {
    setDisplay(true);
    setSelectedImage(imageUrl);
  };
  const closeOverlay = () => {
    setDisplay(false);
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
    setErrors({
      name: '',
      email: '',
      body: '',
    });
    setNewReview({
      ...newReview,
      [e.target.name]: e.target.value,
    });
  };

  const bodyChangeHandler = (e) => {
    setErrors({
      body: '',
      name: '',
      email: '',
    });
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
        [e.target.name]: parseInt(e.target.value),
      },
    });
  };

  const changeRating = (count) => {
    setStars(createStarArray(count + 1));
    setRatingText(ratingDescriptions[count + 1]);
    setNewReview({
      ...newReview,
      rating: count + 1,
    });
  };

  const changeRecommendation = (e) => {
    let recommended = false;
    if (e.target.name === 'yes') {
      setRecommend(true);
      recommended = true;
    } else {
      setRecommend(false);
      recommended = false;
    }
    setNewReview({
      ...newReview,
      recommend: recommended,
    });
  };

  const validateForm = () => {
    let areErrors = false;
    const newErrors = {
      name: '',
      email: '',
      body: '',
      rating: '',
    };
    if (!newReview.name) {
      newErrors.name = 'You must enter a nickname';
      areErrors = true;
    }
    if (!newReview.email) {
      newErrors.email = 'You must enter an email';
      areErrors = true;
    }
    if (!newReview.rating) {
      newErrors.rating = 'You must select a rating';
      areErrors = true;
    }
    if (!newReview.body || newReview.body.length < 50) {
      newErrors.body = 'You must include a body';
      areErrors = true;
    }
    if (areErrors) {
      setErrors(newErrors);
    }

    return areErrors;
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
        inputChangeHandler,
        changeCharacteristic,
        recommend,
        setRecommend,
        bodyChangeHandler,
        bodyCountDown,
        stars,
        setStars,
        changeRating,
        ratingText,
        errors,
        changeRecommendation,
        validateForm,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewProvider;
