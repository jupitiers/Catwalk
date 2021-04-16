import React, {useEffect, useContext} from 'react';
import CardPicture from './CardPicture.jsx';
import CardDescription from './CardDescription.jsx';

const RelatedItemCard = () => {
  return (
    <div>
      <CardPicture />
      <CardDescription />
    </div>
  )
}

export default RelatedItemCard;