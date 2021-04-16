import React, {useEffect, useContext} from 'react';
import AddCard from './AddCard.jsx';
import OutfitCard from './OutfitCard.jsx';

const YourOutfitCarousel = () => {
  return (
    <div>
      <button>Left</button>
      <AddCard />
      <OutfitCard />
      <OutfitCard />
      <OutfitCard />
      <button>Right</button>
    </div>
  )
}

export default YourOutfitCarousel;