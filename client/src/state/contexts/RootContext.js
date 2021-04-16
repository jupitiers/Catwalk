import React from 'react';
import ProductProvider from './ProductContext';
import APIProvider from './APIContext';
import ReviewProvider from './ReviewsContext'

export const RootProvider = ({children}) => {
  return (
    <ProductProvider>
      <ReviewProvider>
        <APIProvider>
          {children}
        </APIProvider>
      </ReviewProvider>
    </ProductProvider>
  );
};