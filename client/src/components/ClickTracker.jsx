import React, { useContext } from 'react';
import { APIContext } from '../state/contexts/APIContext';
// This component encapsulates the behavior we need...
const ClickTracker = ({ render }) => {
  const { trackClick } = useContext(APIContext);
  return (
    <div onClick={trackClick}>
      {render(null)}
    </div>
  );
};
export default ClickTracker;
