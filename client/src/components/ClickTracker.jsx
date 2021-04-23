import React, { useContext } from 'react';
import { APIContext } from '../state/contexts/APIContext';

const ClickTracker = ({ render }) => {
  const { trackClick } = useContext(APIContext);
  return (
    <div onClick={trackClick}>
      {render(null)}
    </div>
  );
};
export default ClickTracker;
