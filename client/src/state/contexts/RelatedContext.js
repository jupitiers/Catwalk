import React, { createContext, useContext, useState } from 'react';

export const RelatedContext = createContext({});

const RelatedProvider = ({ children }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedProductInfo, setRelatedProductInfo] = useState([]);
  const [allRelatedProductInfo, setAllRelatedProductInfo] = useState([]);

  return (
    <RelatedContext.Provider
      value={{
        relatedProducts,
        setRelatedProducts,
        relatedProductInfo,
        setRelatedProductInfo,
        allRelatedProductInfo,
        setAllRelatedProductInfo
      }}>
        {children}
    </RelatedContext.Provider>
  );
};

export default RelatedProvider;