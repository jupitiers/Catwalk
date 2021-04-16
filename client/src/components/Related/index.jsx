import React, {useEffect, useContext} from 'react';
import RelatedItemsCarousel from './RelatedItems/RelatedItemsCarousel.jsx';
import YourOutfitCarousel from './YourOutfit/YourOutfitCarousel.jsx';

const RelatedItemsAndOutfit = () => {
  return (
    <div>
      <RelatedItemsCarousel />
    </div>
    <div>
      <YourOutfitCarousel />
    </div>
  )
}

export default RelatedItemsAndOutfit;