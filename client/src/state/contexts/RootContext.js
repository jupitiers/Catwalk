import React from 'react';
import ProductProvider from './ProductContext';

export const RootProvider = ({children}) => {
  return (
    <ProductProvider>
      {children}
    </ProductProvider>
  );
};