import React, {useEffect, useContext} from 'react';
import RelatedItem from './RelatedItem.jsx';

const RelatedItemsCarousel = () => {
  return (
    <div>
      <button>Left</button>
      <RelatedItem />
      <RelatedItem />
      <RelatedItem />
      <RelatedItem />
      <button>Right</button>
    </div>
  )
}

export default RelatedItemsCarousel;