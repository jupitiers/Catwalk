import React, {useEffect, useContext} from 'react';
import RelatedItemCard from './RelatedItem.jsx';

const RelatedItemsCarousel = () => {
  return (
    <div>
      <button>Left</button>
      <RelatedItemCard />
      <RelatedItemCard />
      <RelatedItemCard />
      <RelatedItemCard />
      <button>Right</button>
    </div>
  )
}

export default RelatedItemsCarousel;