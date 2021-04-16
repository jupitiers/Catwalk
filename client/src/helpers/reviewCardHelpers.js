import {
  emptyStar, fullStar, quarterStar, halfStar, threeQuarterStar,
} from './starRatings';

export const createStarArray = (review) => {
// get whole number and percent number
  const fullStars = Math.floor(review.rating);
  let decimal = (review.rating % 1).toFixed(1);
  decimal = parseInt(decimal.split('.')[1]);
  let partialStar;
  // 0-1 = no star
  if (decimal < 2) {
    partialStar = (emptyStar);
  }
  // 2-3 = 1/4 star
  if (decimal > 1 && decimal < 4) {
    partialStar = (quarterStar);
  }
  // 4-6 = 1/2 star
  if (decimal > 3 && decimal < 7) {
    partialStar = (halfStar);
  }
  // 7-8 = 3/4 star
  if (decimal > 6 && decimal < 9) {
    partialStar = (threeQuarterStar);
  }
  // 9 = full star
  if (decimal > 8) {
    partialStar = (fullStar);
  }
  // create array for displaying full stars dynamically
  const stars = [];
  for (let i = 1; i < fullStars; i++) {
    stars.push(fullStar);
  }
  stars.push(partialStar);
  // check to see if any empty stars need to be added
  if (stars.length < 5) {
    const starsToAdd = 5 - stars.length;
    for (let i = 0; i < starsToAdd; i++) {
      stars.push(emptyStar);
    }
  }

  return stars;
};

export const truncateSummary = (review) => {
  let truncatedSummary;
  if (review.summary.length > 60) {
    truncatedSummary = `${review.summary.substring(0, 60)}...`;
  } else {
    truncatedSummary = review.summary;
  }
  return truncatedSummary;
};

export const truncateBody = (review) => {
  let truncatedBody;
  let restOfBody;
  if (review.body.length > 250) {
    truncatedBody = `${review.summary.substring(0, 250)}...`;
    restOfBody = review.summary.substring(250);
  } else {
    truncatedBody = review.summary;
  }
  return [truncatedBody, restOfBody];
};
